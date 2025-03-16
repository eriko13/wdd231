const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');
const filterContainer = document.createElement('div');
filterContainer.classList.add('filter-buttons');
document.querySelector('main').insertBefore(filterContainer, cards);

let prophetsData = [];

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  prophetsData = data.prophets;
  
  // Create filter buttons
  createFilterButtons();
  
  // Display all prophets initially
  displayProphets(prophetsData);
}

function createFilterButtons() {
  // Create "Show All" button
  const allButton = document.createElement('button');
  allButton.textContent = 'Show All';
  allButton.addEventListener('click', () => displayProphets(prophetsData));
  filterContainer.appendChild(allButton);
  
  // Create "Born in Utah" button
  const utahButton = document.createElement('button');
  utahButton.textContent = 'Born in Utah';
  utahButton.addEventListener('click', () => {
    const filtered = prophetsData.filter(prophet => prophet.birthplace.includes('Utah'));
    displayProphets(filtered);
  });
  filterContainer.appendChild(utahButton);
  
  // Create "Born outside US" button
  const nonUSButton = document.createElement('button');
  nonUSButton.textContent = 'Born outside US';
  nonUSButton.addEventListener('click', () => {
    const usStates = ['Utah', 'Vermont', 'New York', 'Ohio', 'Missouri', 'Illinois', 'Idaho', 'California', 'Arizona', 'Massachusetts', 'Connecticut'];
    const filtered = prophetsData.filter(prophet => {
      return !usStates.some(state => prophet.birthplace.includes(state));
    });
    displayProphets(filtered);
  });
  filterContainer.appendChild(nonUSButton);
  
  // Create "Lived 95+ years" button
  const ageButton = document.createElement('button');
  ageButton.textContent = 'Lived 95+ years';
  ageButton.addEventListener('click', () => {
    const filtered = prophetsData.filter(prophet => {
      if (prophet.death) {
        const birthDate = new Date(prophet.birthdate);
        const deathDate = new Date(prophet.death);
        const ageInYears = (deathDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000);
        return ageInYears >= 95;
      }
      return false;
    });
    displayProphets(filtered);
  });
  filterContainer.appendChild(ageButton);
  
  // Create "10+ children" button
  const childrenButton = document.createElement('button');
  childrenButton.textContent = '10+ children';
  childrenButton.addEventListener('click', () => {
    const filtered = prophetsData.filter(prophet => prophet.numofchildren >= 10);
    displayProphets(filtered);
  });
  filterContainer.appendChild(childrenButton);
  
  // Create "Served 15+ years" button
  const serviceButton = document.createElement('button');
  serviceButton.textContent = 'Served 15+ years';
  serviceButton.addEventListener('click', () => {
    const filtered = prophetsData.filter(prophet => {
      if (prophet.length) {
        return prophet.length >= 15;
      }
      // For current prophet or those without length data
      if (!prophet.death && prophet.birthdate) {
        const startDate = new Date(prophet.birthdate);
        const today = new Date();
        const yearsServed = (today - startDate) / (365.25 * 24 * 60 * 60 * 1000);
        return yearsServed >= 15;
      }
      return false;
    });
    displayProphets(filtered);
  });
  filterContainer.appendChild(serviceButton);
}

const displayProphets = (prophets) => {
  // Clear existing cards
  cards.innerHTML = '';
  
  // Display count of filtered results
  const resultCount = document.createElement('p');
  resultCount.classList.add('result-count');
  resultCount.textContent = `Showing ${prophets.length} prophet${prophets.length !== 1 ? 's' : ''}`;
  cards.appendChild(resultCount);
  
  prophets.forEach((prophet) => {
    // Create elements
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');
    const birthInfo = document.createElement('p');
    const childrenInfo = document.createElement('p');
    
    // Populate the h2 element with the prophet's full name and order
    fullName.textContent = `${prophet.name} ${prophet.lastname} - ${getOrdinal(prophet.order)}`;
    
    // Populate birth information
    birthInfo.textContent = `Date of Birth: ${prophet.birthdate}
                            Place of Birth: ${prophet.birthplace}`;
    
    // Populate children information
    childrenInfo.textContent = `Children: ${prophet.numofchildren}`;
    
    // Build the image by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${getOrdinal(prophet.order)} Latter-day President`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');
    
    // Append the elements to the card
    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(childrenInfo);
    card.appendChild(portrait);
    
    // Append the card to the cards div
    cards.appendChild(card);
  });
};

// Helper function to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinal(n) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

getProphetData();
