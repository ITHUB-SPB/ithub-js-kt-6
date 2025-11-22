function renderBreeds(data) {
    const tableBodyElement = document.querySelector("#app tbody")

    tableBodyElement.append(
    ...data.map(record => {
        const rowElement = document.createElement("tr")

        const litelElement = document.createElement("td")
        const descriptionElement = document.createElement("td")
        const actionsElement = document.createElement("td")

        litelElement.textContent = record.attributes.name
        descriptionElement.textContent = record.attributes.description;

        rowElement.append(titleElememnt, descriptionElement, actionsElement)

        return rowElement
})
    )
}

fetch("https://dogapi.dog/api/v2/breeds")
    .then(response => {
        if (!response.ok){
            throw new Error("Response status is not OK")
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
        renderBreeds(data)
    });