export function getProducts({ pagination, filter, sorter }) {
  let paginatedUrl = `http://localhost:3001/products?_page=${pagination.page}`;
  paginatedUrl += "&count_gte=10"; // TODO замените на данные из поля filter

  // TODO добавить обработку сортировки из поля sorter

  return fetch(paginatedUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Response status is not OK");
    }

    return response.json();
  });
}
