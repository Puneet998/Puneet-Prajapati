const Joi = require("joi");
const validateMessage = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).trim().required(),
    message: Joi.string().min(25).max(500).required(),
    date: Joi.date(),
  });
  return schema.validate(data);
};
module.exports = validateMessage;





//                           https://m41sqkvg-4000.inc1.devtunnels.ms/