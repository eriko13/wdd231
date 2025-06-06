// Variables for DOM elements
const directoryContainer = document.getElementById('directory-container');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const searchInput = document.getElementById('directory-search');

// Path to the JSON data file
const dataUrl = 'data/members.json';

// Array to store the member data
let membersData = [];
let filteredMembers = [];

// Fetch the member data from the JSON file
async function getMemberData() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    membersData = data.members;
    filteredMembers = [...membersData];
    displayMembers(membersData);
  } catch (error) {
    console.error('Error fetching member data:', error);
    directoryContainer.innerHTML = '<p class="error">Failed to load member data. Please try again later.</p>';
  }
}

// Function to display members in the selected view
function displayMembers(members) {
  // Clear the container
  directoryContainer.innerHTML = '';
  
  // Check if we're in grid or list view
  const isGridView = directoryContainer.classList.contains('grid-view');
  
  // Show message if no results found
  if (members.length === 0) {
    directoryContainer.innerHTML = '<p class="no-results">No businesses match your search. Please try a different search term.</p>';
    return;
  }
  
  // Create and append member cards/items
  members.forEach(member => {
    const memberElement = document.createElement('div');
    memberElement.classList.add('member');
    
    // Different HTML structure based on view type
    if (isGridView) {
      // Grid view (card style)
      memberElement.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <p class="address">${member.address}</p>
        <p class="phone">${member.phone}</p>
        <p class="website"><a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
        <p class="description">${member.description}</p>
        <p class="membership-level">${getMembershipLevel(member.membershipLevel)}</p>
      `;
    } else {
      // List view
      memberElement.innerHTML = `
        <div class="member-info">
          <h3>${member.name}</h3>
          <p>${member.address} | ${member.phone}</p>
          <p><a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
        </div>
        <div class="member-level">
          <p>${getMembershipLevel(member.membershipLevel)}</p>
        </div>
      `;
    }
    
    directoryContainer.appendChild(memberElement);
  });
}

// Function to filter members based on search input
function filterMembers(searchTerm) {
  if (!searchTerm) {
    return membersData;
  }
  
  const term = searchTerm.toLowerCase();
  return membersData.filter(member => 
    member.name.toLowerCase().includes(term) || 
    member.description.toLowerCase().includes(term) ||
    member.address.toLowerCase().includes(term)
  );
}

// Helper function to convert membership level number to text
function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return 'Member';
    case 2:
      return 'Silver Member';
    case 3:
      return 'Gold Member';
    default:
      return 'Member';
  }
}

// Event listeners for view toggle buttons
gridViewBtn.addEventListener('click', () => {
  if (!directoryContainer.classList.contains('grid-view')) {
    directoryContainer.classList.add('grid-view');
    directoryContainer.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    displayMembers(filteredMembers);
  }
});

listViewBtn.addEventListener('click', () => {
  if (!directoryContainer.classList.contains('list-view')) {
    directoryContainer.classList.add('list-view');
    directoryContainer.classList.remove('grid-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    displayMembers(filteredMembers);
  }
});

// Event listener for search input
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  filteredMembers = filterMembers(searchTerm);
  displayMembers(filteredMembers);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  getMemberData();
}); 