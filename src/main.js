import { books } from "./data.js";

const container = document.querySelector("#books");
const width = window.innerWidth;
const isMobile = width <= 375;

let isDown = false;
let startX;
let scrollStart;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX;
  scrollStart = container.scrollLeft;
});

container.addEventListener("mouseup", () => (isDown = false));
container.addEventListener("mouseleave", () => (isDown = false));

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = startX - x;
  container.scrollLeft = scrollStart + walk;
  console.log(container.scrollLeft, walk);
});

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (book.groupId === 1 && !isMobile) {
    card.classList.add("main");
  }
  if (book.groupId === 2 && !isMobile) {
    card.classList.add("secondary");
  }

  card.id = `book${book?.id}-group${book?.groupId || 0}`;

  const coverContainer = document.createElement("div");
  coverContainer.classList.add("card__cover");
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
