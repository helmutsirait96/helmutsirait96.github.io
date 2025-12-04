 // Ambil Semua Elemen DOM yang Dibutuhkan (DEKLARASI) 
const nav = document.querySelector('nav');
const linka = document.querySelectorAll('header nav a');
const burger = document.querySelector('.burger');
const burgerLine = document.querySelectorAll('.burger .burger-line');
const containerMenu = document.querySelector('.nav-link');
 let sections = document.querySelectorAll('section');

// burger button
burger.addEventListener('click', function () {
      burger.classList.toggle('burger-active');
      containerMenu.classList.toggle('open-nav');
       document.body.classList.toggle('hide-screen');
})
// smooth scrool clik the link
for( let i = 0; i < linka.length; i++ ){
         linka[i].addEventListener('click', function(event) {
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
               if( containerMenu.classList.contains('open-nav')) {
                  burger.click();
               }
         });
    }
// scrolled and menu active link
document.addEventListener("DOMContentLoaded", () => {
    // Variabel Konfigurasi
    const headerOffset = 80; // Offset untuk Scroll Spy
    const scrollThreshold = 50; // Ambang batas gulir untuk mengubah background

    // Cek keberadaan elemen utama
    if (!nav) {
        console.error("Elemen <nav> tidak ditemukan.");
        return;
    }
// 2. FUNGSI BANTUAN    
    function removeActiveClass() {
        linka.forEach(link => {
            link.classList.remove('active');
        });
    }
    function handleNavBackground() {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
            containerMenu.classList.add('scrolled');
            linka.forEach(link => link.classList.add('scrolled'));
            burgerLine.forEach(line => line.classList.add('scrolled'));
        } else {
            nav.classList.remove('scrolled');
            containerMenu.classList.remove('scrolled');
            linka.forEach(link => link.classList.remove('scrolled'));
            burgerLine.forEach(line => line.classList.remove('scrolled'));
        }
    }
// 3. SCROLL SPY & NAVIGASI AKTIF 
// Dapatkan Path saat ini. Ganti 'index.html' dengan '' jika di root
    const currentPath = window.location.pathname.split('/').pop() || ''; 
    let isMultiPageNav = false;

// 1. Prioritaskan Pengecekan Multi-Halaman (Termasuk Home)
linka.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Lewati tautan internal (anchor) untuk logika multi-halaman
        if (linkHref.startsWith('#')) return; 
        // Dapatkan nama file atau string kosong jika linkHref adalah '/'
        const linkPath = linkHref.split('/').pop() || '';
        // **PERBAIKAN HOME:**
        // Cek jika link ini adalah tautan Home (index.html atau kosong)
        const isHomeLink = linkPath === '' || linkPath.toLowerCase() === 'index.html';
        // Cek jika halaman saat ini adalah Home (root atau index.html)
        const isCurrentHome = currentPath === '' || currentPath.toLowerCase() === 'index.html';
        // Jika tautan adalah Home DAN halaman saat ini adalah Home, ATAU
        // Jika tautan dan halaman cocok (untuk non-Home)
        if ((isHomeLink && isCurrentHome) || (linkPath === currentPath)) {
            removeActiveClass();
            link.classList.add('active');
            isMultiPageNav = true;
        }
    });

    // --- Fungsi yang menjalankan logika Scroll Spy ---
    function checkScrollActive() {
        let currentSectionId = '';
        
        // Tentukan bagian mana yang sedang dilihat
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - headerOffset) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Terapkan kelas 'active' jika ID bagian ditemukan
        if (currentSectionId) {
            removeActiveClass();
            linka.forEach(link => {
                const linkTarget = link.getAttribute('href').substring(1); 
                
                // Ini akan mengaktifkan #home saat gulir
                if (linkTarget === currentSectionId) {
                    link.classList.add('active');
                }
            });
        }
        
        // **PERBAIKAN HOME SCROLL**
        // Jika di bagian paling atas (atau di atas ambang batas scroll)
        if (window.scrollY < scrollThreshold) {
             removeActiveClass();
             // Cari tautan yang href-nya #home (atau '/')
             const homeLinkRef = Array.from(linka).find(link => 
                 link.getAttribute('href').toLowerCase() === '#home' || 
                 link.getAttribute('href') === '/' || 
                 link.getAttribute('href').toLowerCase() === 'index.html'
             );
             
             if (homeLinkRef) {
                 homeLinkRef.classList.add('active');
             }
         }
    }
    // 4. Inisialisasi Event Listener
    window.addEventListener('scroll', () => {
        handleNavBackground(); // Latar belakang navigasi

        // Scroll Spy hanya berjalan jika ini bukan navigasi multi-halaman yang sudah diatur
        // (Scroll spy akan mengambil alih jika pengguna berada di index.html dan menggulir)
        if (!isMultiPageNav) { 
            checkScrollActive(); 
        }
    });
    // Panggil fungsi sekali saat load untuk mengatur status awal
    handleNavBackground(); // Atur background awal
    // Atur status aktif awal jika ini halaman SPA/Home
    if (!isMultiPageNav) {
        checkScrollActive(); 
    }
});