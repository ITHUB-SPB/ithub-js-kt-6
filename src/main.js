import { getBreeds } from "./api/breeds.js";
import { getRandomFact } from "./api/facts.js";

function renderBreeds(data) {
    const tableBodyElement =
        document.querySelector("#app tbody");

    tableBodyElement.innerHTML = "";

    tableBodyElement.append(
        ...data.map((record) => {
            const rowElement = document.createElement("tr");

            const titleElement =
                document.createElement("td");
            const descriptionElement =
                document.createElement("td");
            const actionsElement =
                document.createElement("td");

            titleElement.textContent =
                record.attributes.name;
            descriptionElement.textContent =
                record.attributes.description;

            rowElement.append(
                titleElement,
                descriptionElement,
                actionsElement
            );

            return rowElement;
        })
    );
}

function renderPages(pagination) {
    const paginationElement =
        document.querySelector("#pagination");

    const pages = [pagination.current];

    if (pagination.current >= 2) {
        pages.unshift(pagination.current - 1);
    }

    if (pagination.current < pagination.last) {
        pages.push(pagination.current + 1);
    }

    paginationElement.innerHTML = "";

    paginationElement.append(
        ...pages.map((pageNumber) => {
            const pageButton =
                document.createElement("button");
            pageButton.textContent = String(pageNumber);
            pageButton.value = pageNumber;
            return pageButton;
        })
    );
}

function renderFact(text) {
    const factElement = document.querySelector('#fact')
    factElement.textContent = text
}

function renderAlert(title, message) {
    // TODO обрабатывать title
    const alertElement = document.querySelector('#alert')

    const messageElement = alertElement.querySelector('p')
    messageElement.textContent = message

    alertElement.show()
}

document
    .querySelector("#pagination")
    .addEventListener("click", (e) => {
        const pageNumber = +e.target.value;

        getBreeds(pageNumber)
            .then((data) => {
                console.log(data);
                renderBreeds(data.data);
                renderPages(data.meta.pagination);
            })
            .catch(error => {
                renderAlert('', error.message)
            })
    });

document.addEventListener("DOMContentLoaded", () => {
    getBreeds()
        .then((data) => {
            console.log(data);
            renderBreeds(data.data);
            renderPages(data.meta.pagination);
        })
        .catch(error => {
            renderAlert('', error.message)
        })

    getRandomFact()
        .then((data) => {
            console.log(data);
            renderFact(data.data[0].attributes.body)
        })
        .catch(error => {
            renderAlert('', error.message)
        })
});

// "https://dogapi.dog/api/v2/breeds?page[number]=2&page[size]=5";
