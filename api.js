export function getProducts({ pagination, filter, sorter }) {

  let url = http://localhost:3001/products?_page=${pagination.page}&_limit=10;
  

  if (filter && filter !== "null") {

    url += &${filter};
  } else {

    url += '&count_gte=10';
  }
  

  if (sorter && sorter.field && sorter.order) {
    url += &_sort=${sorter.field}&_order=${sorter.order};
  }

  console.log('Fetching from URL:', url); 

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(HTTP error! status: ${response.status});
      }
      

      return Promise.all([
        response.json(),
        Promise.resolve(response.headers.get('X-Total-Count') || 0)
      ]);
    })
    .then(([data, totalCount]) => {

      const totalPages = Math.ceil(totalCount / 10);
      
      return {
        data: data,
        pages: totalPages
      };
    });
}
