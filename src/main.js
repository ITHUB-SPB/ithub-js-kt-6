import { getPosts, getPost } from "./api/posts.js";
import { getUser } from "./api/users.js";
import { getComments } from "./api/comments.js";

function showModal(postData, userData) {
  const modalElement = document.querySelector("#modal");
  const titleElement = modalElement.querySelector("h2");
  const contentElement = modalElement.querySelector("p");
  const addressElement = modalElement.querySelector("address");

  titleElement.textContent = postData.title;
  contentElement.textContent = postData.body;
  addressElement.textContent = `${userData.name} (${userData.username})`;

  modalElement.setAttribute("data-postId", postData.id);

  modalElement.showModal();
}

function renderComments(commentsData) {
  const commentsElement = document.querySelector("#modal footer");
  commentsElement.innerHTML = "";

  commentsElement.append(
    ...commentsData.map((commentData) => {
      const commentElement = document.createElement("section");

      commentElement.innerHTML = `
        <address>${commentData.email}</address>
        <p>${commentData.body}</p>
      `;
      return commentElement;
    })
  );
}

function renderPosts(data) {
  const tableBodyElement = document.querySelector("#app tbody");

  tableBodyElement.innerHTML = "";

  tableBodyElement.append(
    ...data.map((record) => {
      const rowElement = document.createElement("tr");

      const titleElement = document.createElement("td");
      const descriptionElement = document.createElement("td");
      const actionsElement = document.createElement("td");

      titleElement.textContent = record.title;
      descriptionElement.textContent = record.body;

      const buttonElement = document.createElement("button");
      buttonElement.value = record.id;
      buttonElement.textContent = "Show";

      buttonElement.addEventListener("click", (event) => {
        getPost(event.target.value)
          .then((postData) => Promise.all([postData, getUser(postData.userId)]))
          .then(([postData, userData]) => {
            showModal(postData, userData);
          });
      });

      actionsElement.appendChild(buttonElement);

      rowElement.append(titleElement, descriptionElement, actionsElement);

      return rowElement;
    })
  );
}

function renderPages(pagination) {
  const paginationElement = document.querySelector("#pagination");

  const pages = [pagination.current];

  if (pagination.current >= 2) {
    pages.unshift(pagination.current - 1);
  }

  if (pagination.current < pagination.last) {
    pages.push(pagination.current + 1);
  }

  paginationElement.innerHTML = "";

  paginationElement.append(
    ...pages.map((pageNumber) => {
      const pageButton = document.createElement("button");
      pageButton.textContent = String(pageNumber);
      pageButton.value = pageNumber;
      return pageButton;
    })
  );
}

function renderAlert(title, message) {
  // TODO обрабатывать title
  const alertElement = document.querySelector("#alert");

  const messageElement = alertElement.querySelector("p");
  messageElement.textContent = message;

  alertElement.show();
}

document.querySelector("#pagination").addEventListener("click", (e) => {
  const pageNumber = +e.target.value;

  getPosts(pageNumber)
    .then((data) => {
      console.log(data);
      renderPosts(data);
      renderPages(data.meta.pagination);
    })
    .catch((error) => {
      renderAlert("", error.message);
    });
});

document.querySelector("#load-comments").addEventListener("click", (event) => {
  const postId = event.target.closest("#modal").dataset.postid;

  getComments(postId).then((commentsData) => {
    renderComments(commentsData);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  getPosts()
    .then((data) => {
      console.log(data);
      renderPosts(data);
      // renderPages(data.meta.pagination);
    })
    .catch((error) => {
      renderAlert("", error.message);
    });
});
