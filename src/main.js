import { books } from "./data.js";

const container = document.querySelector("#books");

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (book.groupId === 1) {
    card.classList.add("main");
  }
  if (book.groupId === 2) {
    card.classList.add("secondary");
  }
  card.id = `book${book?.id}-group${book?.groupId || 0}`;

  const coverContainer = document.createElement("div");
  coverContainer.classList.add("card__cover");
  coverContainer.style.backgroundImage = "url('/public/background.png')";
  const coverImage = document.createElement("img");
  coverImage.classList.add("card__cover__image");
  coverImage.src = book.image;

  coverContainer.appendChild(coverImage);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("card__info");
  const title = document.createElement("h2");
  title.classList.add("card__info__title");
  title.textContent = book.title;
  const author = document.createElement("h3");
  author.classList.add("card__info__author");
  author.textContent = book.author;
  const description = document.createElement("p");
  description.classList.add("card__info__description");
  description.textContent = book.description;

  infoContainer.appendChild(title);
  infoContainer.appendChild(author);
  infoContainer.appendChild(description);

  card.appendChild(coverContainer);
  card.appendChild(infoContainer);
  container.appendChild(card);
}

function renderCards(books) {
  books.forEach((book) => {
    createBookCard(book);
  });
}

function initLoadMore() {}

document.addEventListener("DOMContentLoaded", () => {
  renderCards(books);
  initLoadMore();
});
