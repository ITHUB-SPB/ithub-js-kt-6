export function getBreeds(pageNumber = 1) {
    return fetch(
        `https://dogapi.dog/api/v2/breeds?page%5Bnumber%5D=${pageNumber}&page%5Bsize%5D=10`
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