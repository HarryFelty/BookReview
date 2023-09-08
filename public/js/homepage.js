const searchBookHandler = async (event) => {
    event.preventDefault();

    let bookTitle = document.querySelector('#bookSearch').value.trim();
    console.log(bookTitle)
    document.location.replace(`/posts/${bookTitle}`)
}

document.querySelector("#bookSearchButton").addEventListener("click", searchBookHandler)