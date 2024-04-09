document.addEventListener('DOMContentLoaded', function () {
  // Check if the JSON data is already in the local storage

  fetch('leopard.json')
    .then(response => response.json())
    .then(data => {
      // Save the JSON data in the local storage
      localStorage.setItem('leopardData', JSON.stringify(data));
      // Display the data
      displayLeopardData(data);
    })
    .catch(error => console.error('Error fetching JSON data:', error));
});


function displayLeopardData(leopardData) {
  // Places where Leopards live in Sri Lanka
  const leoArea = leopardData.leoArea;
  const leoAreaTitle = document.querySelector('.leo-area h1');
  leoAreaTitle.textContent = leoArea.title;

  const leoAreaVenues = leoArea.venues;
  const leoAreaDivs = document.querySelectorAll('.leo-area div');

  leoAreaVenues.forEach((venue, index) => {
    const venueTitle = leoAreaDivs[index].querySelector('h3');
    venueTitle.textContent = venue.name;

    const venueDescription = leoAreaDivs[index].querySelector('p');
    venueDescription.textContent = venue.description;

    const venueImage = leoAreaDivs[index].querySelector('img');
    venueImage.src = venue.image;
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