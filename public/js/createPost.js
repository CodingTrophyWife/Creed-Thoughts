document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    console.log("title:", title);
    console.log("content:", content);
    const postObj = {
      title: document.querySelector("#title").value,
      content: document.querySelector("#content").value,
    };
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postData = await response.json();
    const id = postData.id;
    if (response.ok) {
      location.href = `/`;
    } else {
      alert("You have an error");
    }
  });