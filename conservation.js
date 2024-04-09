document.addEventListener('DOMContentLoaded', function () {
    // Check if the data is already in local storage 
    fetch('conservation.json')
        .then(response => response.json())
        .then(data => {
            // Save the data to local storage
            localStorage.setItem('conservationData', JSON.stringify(data));

            updateContentFromLocalStorage();

        })
        .catch(error => console.error('Error fetching JSON:', error));

});


function updateContentFromLocalStorage() {
    // Load the data from local storage
    const data = JSON.parse(localStorage.getItem('conservationData'));

    // Update the conservation introduction section
    const introTitle = document.querySelector('.con-intro h1');
    introTitle.textContent = data.conservationIntroduction.title;

    const introParagraphs = document.querySelectorAll('.con-intro .con-text');
    data.conservationIntroduction.paragraphs.forEach((paragraph, index) => {
        introParagraphs[index].textContent = paragraph.text;
    });

    // Update the iframe source
    const introIframe = document.querySelector('.con-intro iframe');
    introIframe.src = data.conservationIntroduction.iframe.src;

    // Update the gallery section
    const galleryImages = document.querySelectorAll('.gallery img');
    data.gallery.images.forEach((imageSrc, index) => {
        galleryImages[index].src = imageSrc;
    });

    // Update the gallery title
    const galTitle = document.querySelector('.gal-title h1');
    galTitle.textContent = data.gallery.title;
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