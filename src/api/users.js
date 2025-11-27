export function getUser(userId) {
    return fetch(
        `http://localhost:3001/users/${userId}`
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