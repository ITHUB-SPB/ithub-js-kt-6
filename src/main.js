import "./global.css";
import "franken-ui/js/core.iife";
import "franken-ui/js/icon.iife";

import { getProducts } from "./api.js";
import { renderTable, renderPagination, showNotification } from "./dom.js";

function render({ pagination, filter, sorter }) {
    getProducts({ pagination, filter, sorter })
        .then((data) => {
            renderTable(data.data);
            renderPagination({
                current: pagination.page,
                total: data.pages,
            });
        })
        .catch((error) => {
            showNotification(error.message, "error");
        });
}

document.querySelector("#pagination").addEventListener("click", (event) => {
    render({ pagination: { page: event.target.textContent } });
    // TODO: пофиксить сброс фильтров при пагинации
});

document.querySelector("#filter-price").addEventListener("click", () => {
    render({
        pagination: { page: 1 },
        filter: "price_gte=5000&price_lte=6000",
    });
});

document.querySelector("#filter-count").addEventListener("click", () => {
    render({ pagination: { page: 1 }, filter: "count_gte=10" });
});

document.querySelector("#filter-reset").addEventListener("click", () => {
    render({ pagination: { page: 1 } });
});

// document.querySelector("<кнопка сортировки>").addEventListener("click", () => {
//     //TODO: вызвать рендер с соответствующим параметром sorter
// });

document.querySelector("#sort-disable").addEventListener("click", () => {
    render({ pagination: { page: 1 } });
    // TODO*: сохранять фильтры
});

document.addEventListener("DOMContentLoaded", () => {
    render({ pagination: { page: 1 } });
});
