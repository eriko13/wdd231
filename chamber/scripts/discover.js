document.addEventListener('DOMContentLoaded', () => {
    displayVisitorMessage();
    loadPointsOfInterest();
});

async function loadPointsOfInterest() {
    try {
        const response = await fetch('./data/discover.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        displayPointsOfInterest(data.points_of_interest);
    } catch (error) {
        console.error('Error loading points of interest:', error);
        document.querySelector('.discover-grid').innerHTML = '<p>Error loading points of interest. Please try again later.</p>';
    }
}

// Display the points of interest as cards
function displayPointsOfInterest(points) {
    const gridContainer = document.querySelector('.discover-grid');
    
    points.forEach(point => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        
        card.innerHTML = `
            <h2>${point.name}</h2>
            <figure>
                <img src="${point.image}" alt="${point.name}" loading="lazy">
            </figure>
            <address>${point.address}</address>
            <p>${point.description}</p>
            <button class="card-button">Learn More</button>
        `;
        
        gridContainer.appendChild(card);
    });
}

// Display visitor message based on localStorage visit data
function displayVisitorMessage() {
    const visitorMessageElement = document.getElementById('visitor-message');
    
    const currentDate = Date.now();
    
    const lastVisit = localStorage.getItem('lastVisitDate');
    
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        // Calculate the difference in days
        const lastVisitDate = parseInt(lastVisit);
        const daysDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            // Less than a day
            message = 'Back so soon! Awesome!';
        } else if (daysDifference === 1) {
            // Exactly one day
            message = 'You last visited 1 day ago.';
        } else {
            // Multiple days
            message = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    localStorage.setItem('lastVisitDate', currentDate);
    
    visitorMessageElement.textContent = message;
} 