const completeBtns = document.querySelectorAll(".deleteButton");

completeBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("===\n\n\ntest\n\n\n===");
    event.preventDefault();
    const postId = document.querySelector("#delete").dataset.id;
    console.log("postId:", postId);
    const response = fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  });
});