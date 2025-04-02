// thankyou.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    // Get the elements where we will display the data
    const summaryFName = document.getElementById('summary-fname');
    const summaryLName = document.getElementById('summary-lname');
    const summaryEmail = document.getElementById('summary-email');
    const summaryPhone = document.getElementById('summary-phone');
    const summaryOrgName = document.getElementById('summary-org_name');
    const summaryTimestamp = document.getElementById('summary-timestamp');

    // Populate the elements with data from query parameters
    // Use 'N/A' or similar if a required parameter is somehow missing
    if (summaryFName) summaryFName.textContent = params.get('fname') || 'N/A';
    if (summaryLName) summaryLName.textContent = params.get('lname') || 'N/A';
    if (summaryEmail) summaryEmail.textContent = params.get('email') || 'N/A';
    if (summaryPhone) summaryPhone.textContent = params.get('phone') || 'N/A';
    if (summaryOrgName) summaryOrgName.textContent = params.get('org_name') || 'N/A';
    
    // Format the timestamp for readability
    if (summaryTimestamp) {
        const isoTimestamp = params.get('timestamp');
        if (isoTimestamp) {
            try {
                const date = new Date(isoTimestamp);
                 // Example format: Monday, May 27, 2024, 10:30:00 AM 
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    second: 'numeric' 
                };
                summaryTimestamp.textContent = date.toLocaleDateString(undefined, options);
            } catch (e) {
                console.error('Error parsing timestamp:', e);
                summaryTimestamp.textContent = isoTimestamp; // Show raw timestamp if parsing fails
            }
        } else {
            summaryTimestamp.textContent = 'N/A';
        }
    }
}); 