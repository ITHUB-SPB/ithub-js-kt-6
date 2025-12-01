import { showNotification } from "./dom.js";

export function getProducts(queryString) {
    let url = `http://localhost:3001/products?${queryString}`;
    const delay = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Response status is not OK");
            }

            return response.json();
        })
        .then((data) => {
            return new Promise((resolve) => {
                showNotification("Loading", "pending");
                setTimeout(() => {
                    showNotification("Completed", "success");
                    return resolve(data);
                }, delay);
            });
        });
}
