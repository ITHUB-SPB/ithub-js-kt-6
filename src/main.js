import "./global.css";
import "franken-ui/js/core.iife";
import "franken-ui/js/icon.iife";

import { getProducts } from "./api.js";
import { renderTable, renderPagination, showNotification } from "./dom.js";

const state = {
    pagination: { page: 1 },
    filter: {},
    sorter: {},
};

function buildParams() {
    const params = new URLSearchParams();

    params.set("_page", state.pagination.page);

    for (const [key, value] of Object.entries(state.filter)) {
        params.set(key, value);
    }

    for (const [key, value] of Object.entries(state.sorter)) {
        params.set(key, value);
    }

    return params.toString();
}

function render() {
    const queryString = buildParams();
    console.log(queryString);

    getProducts(queryString)
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
    const page = Number(event.target.textContent);

    state.pagination.page = page;
    render();
});

document.querySelector("#filter-price").addEventListener("click", () => {
    state.pagination.page = 1;
    state.filter.price_gte = 5000;
    state.filter.price_lte = 6000;
    render();
});

document.querySelector("#filter-count").addEventListener("click", () => {
    state.pagination.page = 1;
    state.filter.count_gte = 10;
    render();
});

document.querySelector("#filter-reset").addEventListener("click", () => {
    state.pagination.page = 1;
    state.filter = {};
    render();
});

document.querySelector("#sort-enable").addEventListener("click", () => {
    state.pagination.page = 1;
    state.sorter._sort = "-price";
    render();
});

document.querySelector("#sort-disable").addEventListener("click", () => {
    state.pagination.page = 1;
    state.sorter = {};
    render();
});

document.addEventListener("DOMContentLoaded", () => {
    render();
});
