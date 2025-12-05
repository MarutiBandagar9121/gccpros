// Talent Solutions JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to cards when they come into view
    const solutionCards = document.querySelectorAll('.solution-card');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-card');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each solution card
    solutionCards.forEach(card => {
        observer.observe(card);
    });
    
    // Handle click events for read more links
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // In a real application, this would navigate to the actual page
            // Here we'll just log which link was clicked
            console.log(`Navigating to: ${this.getAttribute('href')}`);
            
            // If you want to prevent default navigation for demo purposes
            // e.preventDefault();
            
            // You could add analytics tracking here
            // trackLinkClick(this.getAttribute('href'));
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Bonus: Add a simple counter animation for hero stats
    function animateCounter(element, targetValue, duration = 2000) {
        const startValue = 0;
        const increment = targetValue / (duration / 16); // 60fps
        let currentValue = startValue;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                clearInterval(timer);
                element.textContent = targetValue + (element.textContent.includes('+') ? '+' : '');
            } else {
                element.textContent = Math.floor(currentValue) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }
    
    // Only animate counters when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-item h3');
                
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const value = parseInt(text);
                    
                    if (!isNaN(value)) {
                        stat.textContent = '0' + (text.includes('+') ? '+' : '');
                        setTimeout(() => {
                            animateCounter(stat, value);
                        }, 300);
                    }
                });
                
                heroObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const heroSection = document.querySelector('.talent-hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});