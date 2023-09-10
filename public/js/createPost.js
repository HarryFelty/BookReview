
const submitHandler = async (event) => {
    event.preventDefault();

    let title = document.querySelector("#post-title").value.trim();
    let text = document.querySelector('#post-text').value.trim();
    let book_id = document.querySelector('#book-id').textContent;

    if (title && text) {
        const newPost = await fetch('/api/post/', {
            method: "POST",
            body: JSON.stringify({ title, text, book_id }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (newPost.ok) {
            alert("Post created successfully");
            document.location.replace("/")
        }
        else {
            alert("Failed to create post")
        }
    }
    else {
        alert("Please enter a post title and text before submitting")
    }
}

document
    .querySelector('#post-submit')
    .addEventListener('submit', submitHandler);
