//signup form
document.querySelector("#new-post").addEventListener("submit", e => {
  e.preventDefault();
  const postObj = {
      title: document.querySelector("#post-title").value,
      body: document.querySelector("#post-body").value,
  }
  console.log(postObj)
  fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postObj),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => {
      if (res.ok) {
          location.href = "/profile"
      } else {
          console.log(res)
          alert("Error post not made")
      }
  })
})