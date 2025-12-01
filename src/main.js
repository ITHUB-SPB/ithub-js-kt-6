import "./global.css";
import "franken-ui/js/core.iife";
import "franken-ui/js/icon.iife";

import { getProducts } from "./api.js";
import { renderTable, renderPagination, showNotification } from "./dom.js";

function render({ pagination, filter, sorter }) {
  getProducts({ pagination, filter, sorter })
    .then((data) => {
      renderTable(data.data);
      renderPagination({ current: pagination.page, total: data.pages });
    })
    .catch((error) => {
      showNotification(error.message, "error");
    });
}

document.querySelector("#pagination").addEventListener("click", (event) => {
  console.log(event.target.textContent)
  // TODO посмотрите на event.target, найдите в нем номер страницы
  render({ pagination: { page: event.target.textContent } });
  // TODO вызовите рендер со значением pagination: { page: <номер_страницы> }
});

document
  .querySelector("#filter-price")
  ?.addEventListener("click", () => {
    render({ pagination: { page: 1 }, filter: "count_gte=5000&count_lte=6000" });
    // TODO вызвать рендер с соответствующими пагинацией и фильтром 
  });

document.querySelector("#filter-count").addEventListener("click", () => {
  render({ pagination: { page: 1 }, filter: "count_gte=10" });
});

document
  .querySelector("#filter-reset")
  ?.addEventListener("click", () => {
    render({ pagination: { page: 1 }, filter: "" });
  });

document.querySelector("#sort-enable")?.addEventListener("click", () => {
  render({
    pagination: { page: 1 },
    sorter: { 
      field: "price", 
      order: "desc" 
    }
  });
  // TODO вызвать рендер с соответствующим параметром sorter
});

document.querySelector("#sort-disable")?.addEventListener("click", () => {
  render({ pagination: { page: 1 }, sorter:{}});
  // TODO (со звездочкой) сохранять фильтры
});

document.addEventListener("DOMContentLoaded", () => {
  render({ pagination: { page: 1 } });
});
