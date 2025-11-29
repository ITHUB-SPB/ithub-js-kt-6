export function getProducts({ pagination, filter, sorter }) {
  let paginatedUrl = `http://localhost:3001/products?_page=${pagination.page}`;
  
  // Обработка фильтрации
  if (filter && filter.count !== undefined) {
    paginatedUrl += `&count_gte=${filter.count}`;
  }
  
  // Обработка сортировки
  if (sorter && sorter.field) {
    const order = sorter.order === 'descend' ? 'desc' : 'asc';
    paginatedUrl += `&_sort=${sorter.field}&_order=${order}`;
  }

  return fetch(paginatedUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Response status is not OK");
    }

    return response.json();
  });
}

