// about-script.js
// For animated counter in achievements section

document.addEventListener('DOMContentLoaded', function() {
    // Animate achievement counters
    const counters = document.querySelectorAll('.achievement-number');
    const speed = 200; // The lower the slower
    
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    }
    
    // Set up intersection observer to trigger animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Adjust on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.style.display = '';
            } else {
                mainNav.style.display = 'none';
            }
        });
        
        // Initialize mobile menu
        if (window.innerWidth <= 768) {
            mainNav.style.display = 'none';
        }
    }
});