// navbar.ejs

 
//  navbar animation using GSAP

 document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Step 1: Navbar upar se slide-in
    tl.from("#navbar", {
      y: -100,
      opacity: 0,
      duration: 0.8
    });

    // Step 2: Brand name animation
    tl.from(".navbar-brand", {
      y: -30,
      opacity: 0,
      duration: 0.6
    });

    // Step 3: Nav links ek ek karke animate
    tl.from(".navbar-nav .nav-item", {
      y: -20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5
    }, "-=0.3");


  });

///////////
gsap.registerPlugin(ScrollTrigger);




//hero.ejs

 document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

    // Title
    tl.from(".hero-title", {
      y: -50,
      opacity: 0
    });

    // Subtitle
    tl.from(".hero-subtitle", {
      y: 50,
      opacity: 0
    }, "-=0.4");

    // Description
    tl.from(".hero-desc", {
      opacity: 0,
      y: 30
    }, "-=0.3");

    // Buttons - fromTo to fix visibility
    tl.fromTo(".hero-buttons a",
      { opacity: 0, scale: 0.8, display: "inline-block" },
      { opacity: 1, scale: 1, stagger: 0.2, ease: "bounce.out" },
      "-=0.2"
    );
  });
///////////



// // skills.ejs
// // GSAP Animation for Skill Cards
// // GSAP Animation for Skill Cards
// // // GSAP Animation for Cards (only fade in)// GSAP animation on cards on scroll



document.querySelectorAll(".circle").forEach(circle => {
  const percent = parseInt(circle.getAttribute("data-percent"), 10);
  circle.style.setProperty('--percent', percent);
});

gsap.registerPlugin(ScrollTrigger);

// Skill cards scroll animation
gsap.from(".skill-box", {
  opacity: 0,
  // y: 30,
  duration: 1,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".skills-section",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});




// projects.ejs 

gsap.registerPlugin(ScrollTrigger);

gsap.from(".project-card", {
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  // y: 50,
  scrollTrigger: {
    trigger: ".projects-section",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});




// contact.ejs
gsap.registerPlugin(ScrollTrigger);

gsap.from(".contact-form", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});


//alert
document.addEventListener("DOMContentLoaded", () => {
      const flash = document.querySelector(".flash-message");
      const closeBtn = document.querySelector(".flash-message .btn-close");

      if (flash) {
        // Slide-down + fade-in animation
        gsap.fromTo(flash,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        // Auto-hide after 4 seconds
        setTimeout(() => {
          gsap.to(flash, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => flash.remove()
          });
        }, 15000);

        // Manual close with animation
        closeBtn.addEventListener("click", () => {
          gsap.to(flash, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => flash.remove()
          });
        });
      }
    });




  
  //validation bootstrap
  (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()