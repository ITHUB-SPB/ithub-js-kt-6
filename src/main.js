import './global.css'
import "franken-ui/js/core.iife";
import "franken-ui/js/icon.iife";

import { getProducts } from "./api.js";
import { renderTable, renderPagination, showNotification } from "./dom.js";


function render(params) {
  getProducts(params)
    .then((data) => {
      renderTable(data.data);
      renderPagination({ current: params.paginate.page, total: data.pages });
    })
    .catch((error) => {
      showNotification(error.message, "error");
    });
}


document.querySelector("#pagination").addEventListener("click", (event) => {
  // TODO
});


document.addEventListener("DOMContentLoaded", () => {
  // TODO
});
