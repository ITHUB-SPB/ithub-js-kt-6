export function getProducts({ paginate }) {
    return fetch(
        `http://localhost:3001/products?_page=${paginate.page}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Response status is not OK"
                );
            }

            return response.json();
        })
}