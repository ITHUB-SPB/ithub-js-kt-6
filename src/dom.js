export function renderTable(productsData) {
    const tableBodyElement = document.querySelector("#products > tbody");
    tableBodyElement.innerHTML = "";

    tableBodyElement.append(
        ...productsData.map((productRecord) => {
            const rowElement = document.createElement("tr");
            rowElement.innerHTML = `
                <td>${productRecord.title}</td>
                <td>${productRecord.price}</td>
                <td>${productRecord.count}</td>

                <!-- TODO заменить массив на средний балл и количество, например 3.4 (8) -->
                <td>${JSON.stringify(productRecord.marks)}</td>
            `;
            return rowElement;
        })
    );
}

export function renderPagination({ current, total }) {
    const pages = Array.from({ length: total }, (_, i) => i + 1)

    const paginationElement = document.querySelector("#pagination");
    paginationElement.innerHTML = ''

    paginationElement.append(
        ...pages.map((pageNumber) => {
            const buttonElement = document.createElement('button')
            buttonElement.textContent = String(pageNumber)
            buttonElement.className = `uk-btn uk-btn-sm ${pageNumber == current ? 'uk-btn-ghosted' : 'uk-btn-primary'}`
            return buttonElement
        })
    )
}

export function showNotification(message, type, timeout = 5000) {
    const iconTemplates = {
        error: "<span class='flex-none mr-2'><uk-icon icon='circle-slash'></uk-icon></span>",
        pending: "<span class='flex-none mr-2'><uk-icon icon='loader-pinwheel'></uk-icon></span>",
        success: "<span class='flex-none mr-2'><uk-icon icon='smile'></uk-icon></span>"
    }

    UIkit.notification({
        message: `<div class='flex items-center'>${iconTemplates[type] ?? ""}${message}</div>`,
        pos: "top",
        timeout,
    });
}