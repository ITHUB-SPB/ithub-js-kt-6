export function getPosts(pageNumber = 1) {
    return fetch(
        `http://localhost:3001/posts`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Response status is not OK"
                );
            }

            return response.json();
        }) //n
        .catch(error => {
            console.error(error)
            throw new Error("Произошла ошибка. Попробуйте позже")
        })
}