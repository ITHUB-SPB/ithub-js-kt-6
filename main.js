import "./global.css";
import "franken-ui/js/core.iife";
import "franken-ui/js/icon.iife";

import { getProducts } from "./api.js";
import { renderTable, renderPagination, showNotification } from "./dom.js";

let currentFilter = "count_gte=10"; 
let currentSorter = null; 

function render({ pagination, filter, sorter }) {

  if (filter !== undefined) currentFilter = filter;
  if (sorter !== undefined) currentSorter = sorter;

  getProducts({ pagination, filter: currentFilter, sorter: currentSorter })
    .then((data) => {
      renderTable(data.data);
      renderPagination({ current: pagination.page, total: data.pages });
    })
    .catch((error) => {
      showNotification(error.message, "error");
    });
}


document.querySelector("#pagination").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const page = parseInt(event.target.textContent);
    render({ pagination: { page } });
  }
});


document.querySelector("#filter-price")?.addEventListener("click", () => {
  render({ pagination: { page: 1 }, filter: "price_gte=100&price_lte=500" });
});


document.querySelector("#filter-reset")?.addEventListener("click", () => {
  render({ pagination: { page: 1 }, filter: null, sorter: null });
});


document.querySelector("#sort-price")?.addEventListener("click", () => {
  render({ pagination: { page: 1 }, sorter: { field: "price", order: "asc" } });
});


document.querySelector("#sort-disable")?.addEventListener("click", () => {
  render({ pagination: { page: 1 }, sorter: null });
});

document.addEventListener("DOMContentLoaded", () => {
  render({ pagination: { page: 1 } });
});
