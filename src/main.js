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
  // TODO посмотрите на event.target, найдите в нем номер страницы
  // TODO вызовите рендер со значением pagination: { page: <номер_страницы> }
  console.log(event.target.textContent)
  render({pagination:{page: event.target.textContent}})
});

document
  .querySelector("#filter-price") 
  ?.addEventListener("click", () => {
    // TODO вызвать рендер с соответствующими пагинацией и фильтром
    render({
  pagination: { page: 1},
    filter:"price_gte=5000&price_lte=6000" 
  })
});

document.querySelector("#filter-count").addEventListener("click", () => {
  render({
     pagination: { page: 1 }, filter: "count_gte=10" });
});

document
  .querySelector("#filter-reset")
  ?.addEventListener("click", () => {
      // TODO вызвать рендер с параметрами по умолчанию (без фильтров)
   render({pagination: {page: 1}})
  });

document.querySelector("#sort-enable")?.addEventListener("click", () => {
// TODO вызвать рендер с соответствующим параметром sorter
  render({
    pagination: { page: 1 },
    sorter: {
      field: "price",
      order: "desc"
    }
  });
});

document.querySelector("#sort-disable")?.addEventListener("click", () => {
  render({ pagination: { page: 1 } });
  // TODO (со звездочкой) сохранять фильтры
});

document.addEventListener("DOMContentLoaded", () => {
  render({ pagination: { page: 1 } });
});
