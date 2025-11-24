export function getRandomFact() {
    return fetch(
        `https://dogapi.dog/api/v2/facts`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Response status is not OK"
                );
            }

            return response.json();
        })
        .catch(error => {
            console.error(error)
            throw new Error("Произошла ошибка. Попробуйте позже")
        })
}