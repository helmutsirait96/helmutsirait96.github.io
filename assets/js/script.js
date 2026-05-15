// Remove menu mobile 
const navLink = document.querySelectorAll('.nav-link');
const navLogo = document.querySelector('.nav-logo');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click', linkAction));
navLogo.addEventListener('click', function () {
       const navMenu = document.getElementById('nav-menu');
       navMenu.classList.remove('show-menu');
})

// Menu Show & HIdden 
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close');

// Menu Show
// Validate if contant exists
if(navToggle) {
    navToggle.addEventListener('click', () => {
         navMenu.classList.add('show-menu');
    });  
}

// Menu Hidden
// Validate if contant exists
if(navClose) {
    navClose.addEventListener('click', () => {
         navMenu.classList.remove('show-menu');
    });
}


// Change Background Color 
const scrollHeader = () => {
    const header = document.getElementById('header');

    this.scrollY >= 20 
    ? header.classList.add('scroll-header') 
    : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

// scroll sections active link 
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset; 
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id'),
        sectionClass = document.querySelector('.header a[href*=' + sectionId + ']'
         );
        if( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight ) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');

        }
    });
}
window.addEventListener('scroll', scrollActive);

// scroll about animation 
 gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".text-gradient").forEach((span) => {
 	 gsap.to(span, {
        backgroundSize: '100% 100%',
        ease: 'none',
        scrollTrigger: {
        	   trigger: span, 
        	   start: 'top 70%',
        	   end: 'top 100%',
        	   scrub: true,			
        }
 	 });
 });

// Dark Light Theme 
window.addEventListener('DOMContentLoaded', () => {
   const toggleBtn = document.getElementById('theme-toggle');
   // const iconfreecodecamp = document.querySelector('img .resume-icon');
const imgElemen = document.querySelector('img.resume-icon ');
   function applyTheme (theme) {
      if( theme === 'light' ) {
           document.body.classList.add('light-theme');
           toggleBtn.classList.remove('ri-sun-line');
           toggleBtn.classList.add('ri-moon-line');
           imgElemen.src = './assets/icon/freecodecamp-black.svg';
      } else {
           document.body.classList.remove('light-theme');
           toggleBtn.classList.add('ri-sun-line');
           toggleBtn.classList.remove('ri-moon-line');
           imgElemen.src = './assets/icon/freecodecamp-light.svg';
      }    
       // local storage
      localStorage.setItem('theme', theme)
  }
        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);

       toggleBtn.addEventListener('click', () => {
               isLight = document.body.classList.contains('light-theme');
               applyTheme(isLight ? 'dark' : 'light');
       });   
   
}); 


// Mixitup filter portfolio
let mixer = mixitup('.work-container', {
     selectors: {
          target: '.mix',
     },
     animation: {
         duration: 300,
     }
});

// active work 
const linkWork = document.querySelectorAll(".work-item");
function activeWork () {
      linkWork.forEach((a) => {
         a.classList.remove('active-work');
      });        
        this.classList.add('active-work');    
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));       

// Email JS 
const contactForm = document.getElementById('contact-form'),
contactName = document.getElementById('contact-name'),
contactEmail = document.getElementById('contact-email'),
contactMessage = document.getElementById('contact-message'),
message = document.getElementById('message');

const sendEmail = (e) => {
    e.preventDefault();

    if( contactName.value === '' || 
       contactEmail.value === '' || 
       contactMessage.value === '' ) {
        message.textContent = 'Write all the input fields';

        setTimeout(() => {
            message.textContent = '';
        }, 3000);
    } else  {
       emailjs.sendForm('service_a7pz4t8', 'template_gkt7byc', '#contact-form', '6bdvKfymngas2cJEl' ).then(
  () => {
      message.textContent = 'Message sent ✔';
       setTimeout(() => {
            message.textContent = '';
        }, 5000);
  },
  (error) => {
      alert('OOPs! SOMETHING WENT WRONG...', error);
  },
);
   contactName.value = '';
   contactEmail.value = '';
   contactMessage.value = '';

    }
};
contactForm.addEventListener('submit', sendEmail);

// scroll reveal animation 
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

sr.reveal(`.home-data`);
sr.reveal(`.home-img-wrapper`, { delay: 500 });
sr.reveal(`.home-social`, { delay: 600 });
sr.reveal(`.services-card, .mix`, { interval: 600 });
// sr.reveal(`.skills-developer, .resume-left, .contact-group`, { origin: 'left'});
// sr.reveal(`.skills-designer, .resume-right, .contact-form`, { origin: 'right'});
sr.reveal(`.skills-developer, .resume-left`, { origin: 'left'});
sr.reveal(`.skills-designer, .resume-right`, { origin: 'right'});



// smooth scrool clik the link
for( let i = 0; i < navLink.length; i++ ){
         navLink[i].addEventListener('click', function(event) {
                // call the smoothScroll function
               function smoothScroll(event) {
                   event.preventDefault();
                    // approach #2 - element-scollIntoView()
                  // approach #3 - window.requestAnimationFrame()
                   const targetId = event.currentTarget.getAttribute('href') === '#' ? 'header' :  event.currentTarget.getAttribute('href');
                   const duration = 1000;
                   const targetPosition = document.querySelector(targetId).offsetTop;
                   const startPosition = window.pageYOffset;
                   const distance = targetPosition - startPosition;
                  let start = null;
                  window.requestAnimationFrame(step);
                  function step(timestamp) {
                    if( !start ) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, isInOutQuadCubic(progress, startPosition, distance, duration));
                    if( progress < duration) window.requestAnimationFrame(step);
                     function isInOutQuadCubic(t, b, c, d) {
                          t /= d / 2;
                          if( t < 1 ) return c / 2 * t * t * t + b;
                          t -= 2
                          return c / 2 * (t * t * t + 2) + b; 
                      }
                  }
               } 
               smoothScroll(event);
         });
    }

