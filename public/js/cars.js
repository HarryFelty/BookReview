let cars = document.querySelector("#cars");

cars.addEventListener("click", async event => {
    if (event.target.matches("button")) {
        let clickedId = event.target.getAttribute("data-id");

        const response = await fetch(`/api/cars/${clickedId}`, {
            method: 'DELETE',

            //Following not needed for delete. Would be used in post to send data.
            // headers: {
            //     'Content-type': 'applicaiton/json; charset=UTF-8'
            // },
            // body: JSON.stringify(clickedId)
        });

        await response.json();

        window.location.reload();
    }
})
