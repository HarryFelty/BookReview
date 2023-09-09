const newPostHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#makePost').value.trim();
    const post_id = event.target.dataset.postid
    console.log(post_id)
    if (content && post_id) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create post');
        }
    }
};

document.querySelector('.new-comment-form');
document.addEventListener('submit', newPostHandler);

const searchBookHandler = async (event) => {
    event.preventDefault();

    let bookTitle = document.querySelector('#bookSearch').value.trim();
    console.log(bookTitle)
    document.location.replace(`/posts/${bookTitle}`)
}

document.querySelector("#bookSearchButton").addEventListener("click", searchBookHandler)
