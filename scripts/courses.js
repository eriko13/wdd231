// courses.js for WDD 131 - Dynamic Web Fundamentals

// Course list array
const courses = [
    {
        code: "CSE 110",
        name: "Programming Building Blocks",
        credits: 3,
        completed: true
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 3,
        completed: false
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 3,
        completed: false
    },
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 3,
        completed: true
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 3,
        completed: false
    },
    {
        code: "WDD 231",
        name: "Advanced CSS",
        credits: 3,
        completed: false
    }
];

// Function to display courses based on filter
function displayCourses(filter = 'all') {
    const courseContainer = document.querySelector('#course-container');
    if (!courseContainer) return;
    
    // Filter courses based on selection
    let filteredCourses;
    if (filter === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.code.startsWith(filter));
    }
    
    // Clear previous content
    courseContainer.innerHTML = '';
    
    // Create course cards
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;
        
        courseCard.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
            ${course.completed ? '<p class="status">Completed</p>' : '<p class="status">Not Completed</p>'}
        `;
        
        courseContainer.appendChild(courseCard);
    });
    
    // Calculate and display total credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const creditDisplay = document.querySelector('#total-credits');
    if (creditDisplay) {
        creditDisplay.textContent = totalCredits;
    }
}

// Set up event listeners for filter buttons
document.addEventListener('DOMContentLoaded', () => {
    // Initial display of all courses
    displayCourses();
    
    // Set up filter buttons
    const allButton = document.querySelector('#filter-all');
    const cseButton = document.querySelector('#filter-cse');
    const wddButton = document.querySelector('#filter-wdd');
    
    if (allButton) {
        allButton.addEventListener('click', () => {
            displayCourses('all');
            setActiveButton(allButton);
        });
    }
    
    if (cseButton) {
        cseButton.addEventListener('click', () => {
            displayCourses('CSE');
            setActiveButton(cseButton);
        });
    }
    
    if (wddButton) {
        wddButton.addEventListener('click', () => {
            displayCourses('WDD');
            setActiveButton(wddButton);
        });
    }
});

// Helper function to set active button
function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
} 