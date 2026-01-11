const express = require('express');
const cors = require('cors');
const app = express();
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
require('dotenv').config(); // Load environment variables from .env file

const validateMessage=require("./schema");

const Message=require("./models/message")

const MONGO_URL = process.env.MONGO_DB_URL;
main().then((res)=>{
  console.log("connection successfully");
}).catch((err)=>{
  console.log(err);
})
async function main(){
  await mongoose.connect(MONGO_URL);
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const session = require('express-session');
const flash = require('connect-flash');

const sessionOption={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  }
};
app.use(session(sessionOption));
app.use(flash());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  next();
})

app.get('/', (req, res) => {
  res.render('index.ejs');
});

//from ejs

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  console.log("👉 req.body:", req.body);

  // ✅ Joi Validation
  const { error } = validateMessage({ name, email, message });
  if (error) {
    req.flash("error", "❌ Invalid input data");
    console.error("❌ Validation Error:", error.details[0].message);
    return res.redirect("/");
  }

  try {
    // ✅ Save to Database
    const newMessage = new Message({
      name,
      email,
      msg: message,
      from:"message from ejs making portfolio website"
    });

    await newMessage.save();
    console.log("✅ Message saved to DB");

    // ✅ Send Email
    const capName = name.toUpperCase();

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Message from ${capName} - Portfolio Website`,
      html: `
        <p><strong>Sender:</strong> ${capName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    // ✅ Success Flash
    req.flash(
      "success",
      `😀 Thank you Mr. ${capName}, I'll reply soon via E-mail.`
    );
    res.redirect("/");

  } catch (err) {
    console.error("❌ Error:", err);
    req.flash("error", "❌ Something went wrong. Please try again.");
    res.redirect("/");
  }
});







///next ts -------------

app.post("/sendMail", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // ------------------ VALIDATION ------------------
    const { error } = validateMessage({ name, email, message });
    if (error) {
      console.error("❌ Validation Failed:", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // ------------------ SAVE TO DB ------------------
    const newMessage = new Message({
      name,
      email,
      msg: message,
      from:"message from react making portfolio website"
    });

    await newMessage.save();
    console.log("✅ Message saved to database");

    // ------------------ SEND EMAIL ------------------
    const formattedName = name.toUpperCase();

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Message from ${formattedName} - Portfolio`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${formattedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent successfully");

    // ------------------ RESPONSE ------------------
    return res.status(200).json({
      success: true,
      message: "Message received successfully & email sent! 🚀"
    });

  } catch (err) {
    console.error("❌ Server Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});


// -----------------------------------

// app.get("/more",(req,res)=>{
//   res.render("more")
// })

 app.get("/msg",async (req,res)=>{
  let message=await Message.find();
  // console.log(message[1]);
   res.send(message)
 })

app.all("*",(req,res)=>{
    res.redirect('/'); // Redirect all unknown routes to home;
});

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
})