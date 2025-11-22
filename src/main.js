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

function getBreeds(pageNumber = 1) {
    return fetch(
        `https://dogapi.dog/api/v2/breeds?page%5Bnumber%5D=${pageNumber}&page%5Bsize%5D=10`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Response status is not OK"
                );
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            renderBreeds(data.data);
            renderPages(data.meta.pagination);
        });
}

document
    .querySelector("#pagination")
    .addEventListener("click", (e) => {
        const pageNumber = +e.target.value;
        getBreeds(pageNumber);
    });

document.addEventListener("DOMContentLoaded", getBreeds);

// "https://dogapi.dog/api/v2/breeds?page[number]=2&page[size]=5";
