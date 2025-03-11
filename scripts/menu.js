// menu.js for WDD 131 - Dynamic Web Fundamentals

// Function to toggle the hamburger menu
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('show');
}

// Set up event listener for the hamburger button
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger');
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const nav = document.querySelector('nav');
        const hamburgerButton = document.querySelector('.hamburger');
        
        if (nav.classList.contains('show') && 
            !nav.contains(event.target) && 
            event.target !== hamburgerButton) {
            nav.classList.remove('show');
        }
    });
    
    // Add wayfinding - highlight current page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if this is the current page
        if ((currentPage.endsWith('/') && linkPath === 'index.html') || 
            currentPage.includes(linkPath)) {
            link.classList.add('active');
        }
    });
}); 