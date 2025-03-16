const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();

  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');
    const birthInfo = document.createElement('p');
    
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    
    birthInfo.textContent = `Date of Birth: ${prophet.birthdate}
                            Place of Birth: ${prophet.birthplace}`;
    
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');
    
    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(portrait);
    
    cards.appendChild(card);
  });
};

getProphetData();
