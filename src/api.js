export function getProducts(queryString) {
    let url = `http://localhost:3001/products?${queryString}`;

    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error("Response status is not OK");
        }

        return response.json();
    });
}
