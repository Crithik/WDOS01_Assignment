// Function to load JSON data from file and save to local storage
function loadJSON() {
    fetch('yala.json') // Fetch the JSON file
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        localStorage.setItem('yalaData', JSON.stringify(data)); // Save JSON data to local storage
        renderContent(data); // Call renderContent function to render the content onto the webpage
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// Function to render content onto the webpage
function renderContent(data) {
    const sections = data.sections;

    sections.forEach(section => {
        if (section.title === "Yala Introduction") {
            document.querySelector('.yala-int h1').textContent = section.title;
            document.querySelector('.yala-int p').textContent = section.content;
        } else if (section.title === "Things to Do in Yala National Park") {
            document.querySelector('.trip h1').textContent = section.title;

            const activities = section.activities;
            activities.forEach(activity => {
                const tripCol = document.createElement('div');
                tripCol.classList.add('trip-col');

                const img = document.createElement('img');
                img.src = activity.image;

                const layer = document.createElement('div');
                layer.classList.add('layer');

                const h3 = document.createElement('h3');
                h3.textContent = activity.title;

                layer.appendChild(h3);
                tripCol.appendChild(img);
                tripCol.appendChild(layer);

                document.querySelector('.row').appendChild(tripCol);
            });
        }
    });
}

// Function to check if JSON data exists in local storage
function checkLocalStorage() {
    const yalaData = localStorage.getItem('yalaData');
    if (yalaData) {
        renderContent(JSON.parse(yalaData)); // If JSON data exists, render content onto the webpage
    } else {
        loadJSON(); // If JSON data doesn't exist, load JSON data from file and save to local storage
    }
}

// Call checkLocalStorage function when the page loads
window.onload = checkLocalStorage;


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