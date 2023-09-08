const bookInfo = document.querySelector('#bookInfo');

console.log("post.js loaded")
async function fetchBooks(){
    
    const response = await fetch(`/api/books/${title}`)
    let data = response.json()
    console.log(data)
}

fetchBooks()