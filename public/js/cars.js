let cars = document.querySelector("#cars");

cars.addEventListener("click", async event => {
    if (event.target.matches("button")) {
        let clickedId = event.target.getAttribute("data-id");

        const response = await fetch(`/api/cars/${clickedId}`, {
            method: 'DELETE',


        });

        await response.json();

        window.location.reload();
    }
})
