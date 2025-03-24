// menu.js - Handles the hamburger menu functionality for the Culiacan Chamber of Commerce website

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    // Check if elements exist to prevent errors
    if (!hamburgerBtn || !mainNav) {
        console.error('Menu elements not found');
        return;
    }
    
    // Set initial button display based on screen size
    if (window.innerWidth <= 768) {
        hamburgerBtn.style.display = 'block';
        mainNav.classList.add('closed');
    }
    
    // Toggle the menu when hamburger button is clicked
    hamburgerBtn.addEventListener('click', function() {
        console.log('Hamburger button clicked');
        if (mainNav.classList.contains('closed')) {
            mainNav.classList.remove('closed');
            mainNav.classList.add('open');
            hamburgerBtn.textContent = '✕'; // Change to X when menu is open
        } else {
            mainNav.classList.remove('open');
            mainNav.classList.add('closed');
            hamburgerBtn.textContent = '☰'; // Change back to hamburger icon when menu is closed
        }
    });
    
    // Close the menu when a link is clicked
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('open');
                mainNav.classList.add('closed');
                hamburgerBtn.textContent = '☰';
            }
        });
    });
    
    // Handle window resize - reset menu if screen size changes
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.style.display = 'none';
            mainNav.classList.remove('closed');
            mainNav.classList.remove('open');
        } else {
            hamburgerBtn.style.display = 'block';
            // Make sure menu is closed by default on mobile
            if (!mainNav.classList.contains('open')) {
                mainNav.classList.add('closed');
            }
        }
    });
}); 