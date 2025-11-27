export function getComments(postId) {
    return fetch(
        `http://localhost:3001/comments?postId=${postId}`
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