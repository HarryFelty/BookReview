let title = document.querySelector("#post-title");
let text = document.querySelector('#post-text');
let user_id = document.querySelector("#user_id")
let book_id = document.querySelector('#book-id')


const submitHandler = async(event) => {
    event.preventDefault();
    if(title && text){
        const newPost = await fetch('/api/post/', {
            method: "POST",
            body: JSON.stringify(title, text, user_id, book_id),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if(newPost.ok){
            alert("Post created successfully");
            document.location.replace("/")
        }
        else{
            alert("failed to create post")
        }
    }
    else{
        alert("please enter a post title and text before submitting")
    }
}
document.querySelector('#post-submit').addEventListener("click", submitHandler)