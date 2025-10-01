import { BOOKS_PER_PAGE } from "./constants.js";
import { books, defaultBook } from "./data.js";
import { getGroupedBooks } from "./shuffle.js";

const container = document.querySelector("#books");
const loadMoreButton = document.querySelector("#load-more");
const shuffleButton = document.querySelector("#shuffle");
const width = window.innerWidth;

shuffleButton.addEventListener("click", () => {
  const shuffledBooks = getGroupedBooks(books);
  container.innerHTML = "";
  shuffledBooks.forEach(createBookCard);
});

let isMobile = width <= 375;
// отслеживание изменения размера экрана
function handleResize() {
  const newIsMobile = window.innerWidth <= 375;
  if (newIsMobile !== isMobile) {
    isMobile = newIsMobile;
    renderCards(books); // заново отрисовать
  }
}

// скролл для десктопа с шириной мобилки
let isDown = false;
let startX;
let scrollStart;

container.addEventListener("mousedown", (e) => {
  if (!isMobile || e.target.classList.contains("button")) return;
  isDown = true;
  startX = e.pageX;
  scrollStart = container.scrollLeft;

  container.style.cursor = "grabbing";
  container.style.userSelect = "none";
});

container.addEventListener("mouseup", () => {
  if (!isMobile) return;
  isDown = false;
  container.style.cursor = "grab";
  container.style.removeProperty("user-select");
});
container.addEventListener("mouseleave", () => {
  if (!isMobile) return;
  isDown = false;
  container.style.cursor = "grab";
  container.style.removeProperty("user-select");
});

container.addEventListener("mousemove", (e) => {
  if (!isMobile) {
    container.style.cursor = "default";
    return;
  }
  if (e.target.classList.contains("button") || !isDown) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = startX - x;
  container.scrollLeft = scrollStart + walk;
});

// добавление карточки книги в дом
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

  const button = document.createElement("div");
  button.classList.add("button", "button-mobile");
  button.id = `button${book.id}`;
  button.textContent = "Читать полностью";

  infoContainer.appendChild(button);
  button.addEventListener("click", (e) => {
    console.log("Button clicked", e.target);
    e.stopPropagation();
  });

  card.appendChild(coverContainer);
  card.appendChild(infoContainer);

  container.appendChild(card);
}

// проходим по массиву книг
function renderCards(books) {
  container.innerHTML = "";
  books.forEach((book) => {
    createBookCard(book);
  });
}

// имитация загрузки новых книг
function handleLoadMore() {
  for (let i = 0; i < BOOKS_PER_PAGE; i++) {
    const newBook = Object.assign({}, defaultBook);
    newBook.id = books.length + 1;
    newBook.title = newBook.title + newBook.id;
    books.push(newBook);
    createBookCard(newBook);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards(books);
  window.addEventListener("resize", handleResize);
  loadMoreButton.addEventListener("click", handleLoadMore);
});
