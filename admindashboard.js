document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('emails')) {
        const emails = JSON.parse(localStorage.getItem('emails'));
        const userDetails = document.getElementById('userdetails');
        emails.forEach(email => {
            userDetails.innerHTML += `<span>${email}</span><br>`;
        });
    } else {
        document.getElementById('userdetails').innerText = 'No users found.';
    }
});

document.getElementById('Clear').addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

