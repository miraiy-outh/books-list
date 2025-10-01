// перемешивание в случайном порядке
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

// собираем массив книг обратно
export function getGroupedBooks(books) {
  const groups = {};

  books.forEach((book) => {
    const groupId = book.groupId || 0;
    if (!groups[groupId]) groups[groupId] = [];
    groups[groupId].push(book);
  });

  const sortedGroupIds = Object.keys(groups)
    .map(Number)
    .filter((id) => id !== 0)
    .sort((a, b) => a - b);

  const result = [];

  sortedGroupIds.forEach((id) => {
    result.push(...shuffle([...groups[id]]));
  });

  if (groups[0]) {
    result.push(...shuffle([...groups[0]]));
  }

  return result;
}
