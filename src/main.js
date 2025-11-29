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
    // TODO: вызвать рендер со значением pagination: { page: "номер_страницы" }
    // Tip: посмотрите на event.target, найдите в нем номер страницы
});

// document.querySelector("<кнопка фильтра по цене>").addEventListener("click", () => {
//         // TODO: вызвать рендер с соответствующими пагинацией и фильтром
//     });

document.querySelector("#filter-count").addEventListener("click", () => {
    render({ pagination: { page: 1 }, filter: "count_gte=10" });
});

// document.querySelector("<кнопка сброса>").addEventListener("click", () => {
//     //TODO: вызвать рендер с параметрами по умолчанию (для сброса)
// });

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
