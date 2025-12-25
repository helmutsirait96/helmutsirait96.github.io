document.addEventListener('DOMContentLoaded', function() {
// hamburger menu
const hamBtn = document.querySelector('.hamburger');
const layerBtn = document.querySelector('.nav-2 .menu');
hamBtn.addEventListener('click', function () {
	    hamBtn.classList.toggle('active'); 
	    layerBtn.classList.toggle('active');
});

// smooth scroll 
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navMenu = document.querySelector('.nav-menu');
// const navMenu = document.getElementById('nav');
const navHeight = navMenu.offsetHeight;

// function debounce 
const debounce = function(func, wait) {
      let timeout;
      return function(...args) {
      	  const context = this;
      	  clearTimeout(timeout);
      	  timeout = setTimeout(function () {
      	  	  func.apply(context, args);
      	  }, wait);
      };
};

// function smooth scroll 
const smoothScroll = function (element, duration = 800) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - navHeight + 40;
      // const targetPosition = element.getBoundingClientRect().top + window.scrollY - 20;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation  = function (currentTime) {
        	   if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

             const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
              window.scrollTo(0, startPosition + distance * easeProgress);
              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            };       
        };
           requestAnimationFrame(animation);
};

//  ketika menu link diclick 
navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                //  memanggil fungsi smooth scroll
                smoothScroll(targetElement);
            };
            layerBtn.classList.remove('active');
            hamBtn.classList.remove('active');
        });
    });

// active link
const setActiveLink = function() {
    const scrollOffset = window.scrollY + navHeight + 2; 
    // const scrollOffset = window.scrollY + 50 + 100; 
    let currentActiveSection = '';

    sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollOffset >= sectionTop && scrollOffset < sectionTop + sectionHeight) {
                currentActiveSection = section.getAttribute('id');
            }
        });
    navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentActiveSection) {
                link.classList.add('active');
            }
        });
};

 // Implementasi Debounce  
    // const debouncedSetActiveLink = debounce(setActiveLink, 50);
    const debouncedSetActiveLink = debounce(setActiveLink, 0);
    window.addEventListener('scroll', debouncedSetActiveLink);
    window.addEventListener('load', setActiveLink); 




});