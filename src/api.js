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
                    const rndNumber = Math.random();

                    if (rndNumber < 0.2) {
                        showNotification(
                            "Backend said NO. Try to reload the page",
                            "error"
                        );
                        throw new Error("Backend said NO >:(");
                    }

                    showNotification("Completed", "success");

                    return resolve(data);
                }, delay);
            });
        });
}
