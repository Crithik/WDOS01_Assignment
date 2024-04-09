// Save JSON data to local storage (this should be done after fetching and parsing the data)
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data
    fetch('introduction.json')
        .then(response => response.json())
        .then(data => {
            // Store the JSON data in localStorage
            localStorage.setItem('introductionData', JSON.stringify(data));
            // Call function to load and display data
            loadDataAndDisplay();
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

// Function to load data from local storage
function loadDataFromLocalStorage() {
    const data = localStorage.getItem("introductionData");
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

// Function to display the introduction data
function displayIntroductionData(data) {
    const introductionSection = document.querySelector(".int-content");
    data.introduction.forEach((item) => {
        const { title, description, image, location } = item;

        const col1 = document.createElement("div");
        col1.classList.add("int-col");

        const h1 = document.createElement("h1");
        h1.textContent = title;
        col1.appendChild(h1);

        const p = document.createElement("p");
        p.textContent = description;
        col1.appendChild(p);

        const col2 = document.createElement("div");
        col2.classList.add("int-col");

        const img = document.createElement("img");
        img.src = image;
        img.alt = title;
        img.width = "300";
        img.height = "500";
        col2.appendChild(img);

        const locationDiv = document.createElement("div");
        locationDiv.classList.add("location");

        // Create and append the iframe for the map
        const iframe = document.createElement("iframe");
        iframe.src = location;
        iframe.width = "600";
        iframe.height = "450";
        iframe.style.border = "0";
        iframe.allowFullscreen = "";

        locationDiv.appendChild(iframe);

        introductionSection.appendChild(col1);
        introductionSection.appendChild(col2);
        introductionSection.appendChild(locationDiv);
    });
}

// Function to display the table data
function displayTableData(data) {
    const tableSection = document.querySelector(".table table");
    const tbody = document.createElement("tbody");

    data.rows.forEach((row) => {
        const tr = document.createElement("tr");

        for (const key in row) {
            const value = row[key];
            const td = document.createElement("td");

            if (key === "image") {
                const img = document.createElement("img");
                img.src = value;
                img.alt = row.animalName;
                td.appendChild(img);
            } else {
                td.textContent = value;
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    });

    tableSection.appendChild(tbody);
}

// Function to load data and display it on the webpage
function loadDataAndDisplay() {
    const data = loadDataFromLocalStorage();
    if (data) {
        displayIntroductionData(data);
        displayTableData(data.table);
    }
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