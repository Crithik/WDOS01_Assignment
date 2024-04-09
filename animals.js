// Check if the data is already stored in local storage
if (!localStorage.getItem('animalsData')) {
    // If not, fetch the data from the animals.json file and save it to local storage
    fetch('animals.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('animalsData', JSON.stringify(data));
        populateData(data);
      })
      .catch(error => {
        console.error('Error fetching or parsing animals.json:', error);
      });
  } else {
    // If the data is already stored in local storage, load it directly
    const animalsData = JSON.parse(localStorage.getItem('animalsData'));
    populateData(animalsData);
  }
  
  // Function to populate the data
  function populateData(data) {
    const titleElement = document.querySelector('.animal-int h1');
    titleElement.textContent = data.sections[0].title;
    document.querySelector('.animal-int p').textContent = data.sections[0].content;
  
    const buttonsElement = document.querySelector('.animal-btn h2');
    buttonsElement.textContent = data.sections[1].title;
    data.sections[1].buttons.forEach(button => {
      const linkElement = document.createElement('a');
      linkElement.classList.add('btn');
      linkElement.textContent = button.text;
      linkElement.href = button.link;
      document.querySelector('.animal-btn').appendChild(linkElement);
    });
  
    data.sections[2].rows.forEach(row => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
  
      const animalColElement = document.createElement('div');
      animalColElement.classList.add('animal-col');
  
      const titleElement2 = document.createElement('h1');
      titleElement2.textContent = row.title;
      animalColElement.appendChild(titleElement2);
  
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = row.description;
      animalColElement.appendChild(descriptionElement);
  
      rowElement.appendChild(animalColElement);
  
      const imageElement = document.createElement('img');
      imageElement.src = row.image;

      imageElement.style.maxWidth = "45%";
      imageElement.style.maxHeight = "45%";

      rowElement.appendChild(imageElement);
  
      document.querySelector('.animal-content').appendChild(rowElement);
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