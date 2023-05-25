const signUpForm = document.querySelector("#signup-form");

const checkPassword = (pass1, pass2) => {
  if (pass1 === pass2) {
    return true;
  } else {
    return false;
  }
};

signUpForm.addEventListener("submit", async (event) => {
  try {
    const password = document.querySelector("#user-password").value;
    const passConfirm = document.querySelector(
      "#user-password-confirmation"
    ).value;
    if (await checkPassword(password, passConfirm)) {
      event.preventDefault();

      const newUser = {
        userName: document.querySelector("#user-name").value,
        email: document.querySelector("#user-email").value,
        password: document.querySelector("#user-password").value,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      console.log("response:", response);
      if (response.ok) {
        location.href = "/";
      } else {
        alert("some error");
      }
    } else {
      console.log("===\n\n\ntest\n\n\n===");
      alert("passwords must be the same");
    }
  } catch (err) {
    console.log("error:", error);
    alert(err);
  }
});