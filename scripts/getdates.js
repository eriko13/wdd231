// getdates.js for WDD 131 - Dynamic Web Fundamentals

// Function to get and display the current year
function displayCurrentYear() {
    const currentYearElement = document.querySelector('#currentyear');
    const currentYear = new Date().getFullYear();
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
}

// Function to display the last modified date
function displayLastModified() {
    const lastModifiedElement = document.querySelector('#lastModified');
    if (lastModifiedElement) {
        // Format the date to match the example: MM/DD/YYYY HH:MM:SS
        const lastModDate = new Date(document.lastModified);
        
        // Get date components
        const month = String(lastModDate.getMonth() + 1).padStart(2, '0');
        const day = String(lastModDate.getDate()).padStart(2, '0');
        const year = lastModDate.getFullYear();
        
        // Get time components
        const hours = String(lastModDate.getHours()).padStart(2, '0');
        const minutes = String(lastModDate.getMinutes()).padStart(2, '0');
        const seconds = String(lastModDate.getSeconds()).padStart(2, '0');
        
        // Format the date string
        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        
        lastModifiedElement.textContent = `Last modification: ${formattedDate}`;
    }
}

// Run the functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentYear();
    displayLastModified();
}); 