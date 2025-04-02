// thankyou.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Get the elements where we will display the data
    const summaryFName = document.getElementById('summary-fname');
    const summaryLName = document.getElementById('summary-lname');
    const summaryEmail = document.getElementById('summary-email');
    const summaryPhone = document.getElementById('summary-phone');
    const summaryOrgName = document.getElementById('summary-org_name');
    const summaryTimestamp = document.getElementById('summary-timestamp');

    // Populate the elements with data from query parameters
    if (summaryFName) summaryFName.textContent = params.get('fname') || 'N/A';
    if (summaryLName) summaryLName.textContent = params.get('lname') || 'N/A';
    if (summaryEmail) summaryEmail.textContent = params.get('email') || 'N/A';
    if (summaryPhone) summaryPhone.textContent = params.get('phone') || 'N/A';
    if (summaryOrgName) summaryOrgName.textContent = params.get('org_name') || 'N/A';
    
    if (summaryTimestamp) {
        const isoTimestamp = params.get('timestamp');
        if (isoTimestamp) {
            try {
                const date = new Date(isoTimestamp);
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
                summaryTimestamp.textContent = isoTimestamp;
            }
        } else {
            summaryTimestamp.textContent = 'N/A';
        }
    }
}); 