const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        loginMessage.textContent = data.message;

        if (data.token) {
            localStorage.setItem("token", data.token); // Store JWT token
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect after login
            }, 2000);
        }
    } catch (error) {
        console.error("Error during login:", error);
        loginMessage.textContent = "Invalid credentials. Please try again.";
    }
});