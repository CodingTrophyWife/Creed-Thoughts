document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const postId = document.querySelector("#post-section").dataset.id;
  
    const postObj = {
      title: document.querySelector("#title").value,
      comment: document.querySelector("#content").value,
    };
    fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify(postObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        location.href = `/`;
      } else {
        alert("You have an error");
      }
    });
  });