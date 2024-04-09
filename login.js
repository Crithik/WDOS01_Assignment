document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        fetch('user.json')
            .then(response => response.json())
            .then(users => {
                const user = users.Users.find(user => user.username === username && user.Password === password);

                if (user) {
                    if (user.role === "admin") {
                        window.location.href = "admindashboard.html";
                        localStorage.setItem("Check",JSON.stringify("admin"))
                        console.log(localStorage)
                    } else {
                        window.location.href = "dashboard.html";
                        localStorage.setItem("Check",JSON.stringify("user"))
                        console.log(localStorage)
                    }
                } else {
                    alert("Invalid username or password!");
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    });
});
 