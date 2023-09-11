
const addBookHandler = async (event) => {
    event.preventDefault();

    let bookTitle = document.querySelector("#book-title").value.trim();
    const postBook = await fetch(`/api/books/${bookTitle}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let newBook = await postBook.json()
    console.log(newBook)

    if (postBook.ok) {
        document.location.replace(`/getBook/id/${newBook.id}`);
    }
}

document.querySelector("#addBook").addEventListener("click", addBookHandler)
