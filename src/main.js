import "./global.css";
import "franken-ui/js/core.iife";
import "franken-ui/js/icon.iife";

import { getProducts } from "./api.js";
import { renderTable, renderPagination, showNotification } from "./dom.js";

let currentFilter = null;
let currentSorter = null;
let isSorting = false;

function render({ pagination, filter, sorter }) {
  if (filter !== undefined) currentFilter = filter;
  if (sorter !== undefined) {
    currentSorter = sorter;
    isSorting = sorter !== null;
  }
  
  getProducts({ 
    pagination, 
    filter: currentFilter, 
    sorter: currentSorter 
  })
    .then((data) => {
      renderTable(data.data);
      renderPagination({ current: pagination.page, total: data.pages });
    })
    .catch((error) => {
      showNotification(error.message, "error");
    });
}

document.querySelector("#pagination").addEventListener("click", (event) => {
  if (event.target.tagName === 'BUTTON') {
    const pageNumber = parseInt(event.target.textContent);
    render({ pagination: { page: pageNumber } });
  }
});

document.querySelector("#filter-price").addEventListener("click", () => {
  render({ 
    pagination: { page: 1 }, 
    filter: "price_gte=5000&price_lte=6000" 
  });
});

document.querySelector("#filter-count").addEventListener("click", () => {
  render({ 
    pagination: { page: 1 }, 
    filter: "count_gte=10" 
  });
});

document.querySelector("#filter-reset").addEventListener("click", () => {
  render({ 
    pagination: { page: 1 }, 
    filter: null
  });
});

document.querySelector("#sort-enable").addEventListener("click", () => {
  if (!isSorting || currentSorter === "asc") {
    render({ 
      pagination: { page: 1 }, 
      sorter: "desc" 
    });
  } else {
    render({ 
      pagination: { page: 1 }, 
      sorter: "asc" 
    });
  }
});

document.querySelector("#sort-disable").addEventListener("click", () => {
  render({ 
    pagination: { page: 1 }, 
    sorter: null
  });
});

document.addEventListener("DOMContentLoaded", () => {
  render({ pagination: { page: 1 } });
});