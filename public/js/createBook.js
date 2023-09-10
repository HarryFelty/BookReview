



const addBookHandler = async (event) => {
    event.preventDefault();

    let bookTitle = document.querySelector("#book-title").value.trim();
    const postBook = await fetch(`/api/books/${bookTitle}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (postBook.ok) {
        document.location.replace(`/getBook/${bookTitle}`);
    }
}
document.querySelector("#addBook").addEventListener("click", addBookHandler)
