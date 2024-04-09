document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data
    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            // Store the JSON data in localStorage
            localStorage.setItem('wildlifeData', JSON.stringify(data));
            // Call function to populate HTML elements with JSON data
            populateHTML(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

// Function to populate HTML elements with JSON data
function populateHTML(data) {
    // Populate intro section
    document.querySelector('.cta h1').innerText = data.intro.title;
    document.querySelector('.cta p').innerText = data.intro.content;

    // Populate content section
    document.querySelector('.content h1').innerText = data.content.title;
    const contentParagraphs = document.querySelector('.content .row').querySelectorAll('.content-col p');
    data.content.paragraphs.forEach((paragraph, index) => {
        contentParagraphs[index].innerText = paragraph;
    });

    // Populate bullet sections
    const bulletSections = document.querySelectorAll('.bullet');
    bulletSections.forEach((section, index) => {
        const sectionData = index === 0 ? data.wildlifeExperiences : data.accidentSteps;
        section.querySelector('h2').innerText = sectionData.title;
        if (index === 0) {
            section.querySelector('img').src = sectionData.image;
        } else {
            section.querySelector('img').src = sectionData.image;
        }
        const listItems = section.querySelectorAll('ul li span');
        sectionData.experiences.forEach((experience, i) => {
            listItems[i].innerText = experience.title + ': ' + experience.description;
        });
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

