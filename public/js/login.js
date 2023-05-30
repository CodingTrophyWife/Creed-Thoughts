//login form
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        password: document.querySelector("#login-password").value,
        username: document.querySelector("#signup-username").value,
    }
    console.log(userObj)
    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("Signup error, please try again.")
        }
    })
})