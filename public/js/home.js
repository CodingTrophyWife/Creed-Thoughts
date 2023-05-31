const commentSection = document.querySelectorAll(".comments");
const textArea = document.querySelectorAll(".form-control");
const commentBtns = document.querySelectorAll(".comment");

commentBtns.forEach((commentBtn, i) => {
    commentBtn.addEventListener('click', e => {
        console.log(commentBtn);
        console.log(i);
        console.log(commentSection[i]);
        commentSection[i].setAttribute("style", "");
        const addComment = document.querySelector(".addComment");
        addComment.addEventListener('click', e => {
            e.preventDefault();
            console.log(e.target.getAttribute("data-id"));
            console.log(textArea[i].value);
        });
    });
});

    




