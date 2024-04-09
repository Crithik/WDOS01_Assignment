// Step 1: Fetch JSON data
fetch('wilpattu.json')
  .then(response => response.json())
  .then(data => {
    // Step 2: Save JSON data in local storage
    localStorage.setItem('wilpattuData', JSON.stringify(data));

    // Step 3: Load JSON data from local storage and display content
    displayContent();
  })
  .catch(error => console.error('Error fetching JSON data:', error));


  
// Function to display content
function displayContent() {
  const wilpattuData = JSON.parse(localStorage.getItem('wilpattuData'));

  // Display Wilpattu Introduction
  const wilpattuIntro = document.querySelector('.wil-int .wil-cen h1');
  wilpattuIntro.textContent = wilpattuData.sections[0].title;

  const wilpattuIntroContent = document.querySelector('.wil-int .wil-cen p');
  wilpattuIntroContent.textContent = wilpattuData.sections[0].content;

  // Display Things to Do in Wilpattu National Park
  const tripTitle = document.querySelector('.trip h1');
  tripTitle.textContent = wilpattuData.sections[1].title;

  const activities = wilpattuData.sections[1].activities;

  const row = document.querySelector('.trip .row');

  activities.forEach(activity => {
    const col = document.createElement('div');
    col.classList.add('col');

    const img = document.createElement('img');
    img.src = activity.image;
    col.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = activity.title;
    col.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = activity.description;
    col.appendChild(p);

    row.appendChild(col);
  });
}


// subscriptions 
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  if (localStorage.getItem('emails')) {
      const emails = JSON.parse(localStorage.getItem('emails'));
      emails.push(email);
      localStorage.setItem('emails', JSON.stringify(emails));
  } else {
      localStorage.setItem('emails', JSON.stringify([email]));
  }
  document.getElementById('email').value = '';
  alert('Subscription successful!');
});