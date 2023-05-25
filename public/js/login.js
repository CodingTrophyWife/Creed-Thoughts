const loginForm = document.querySelector("#login-form");


loginForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();

    const user = {
      email: document.querySelector("#login-email").value,
      password: document.querySelector("#login-password").value,
    };

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      location.href = "/";
    } else {
      alert("Username or password was incorrect");
    }
  } catch (err) {
    console.log("error:", error);
    alert(err);
  }
});