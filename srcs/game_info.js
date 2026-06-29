const LETTERS = "ABCDEFGHIJKLMNOPRST".split("");

const CATEGORY = [
  "Cities",
  "Foods",
  "Movies",
  "Soccer Players",
  "Countries",
  "Baskeetball Players",
  "Video Games",
  "Animals",
];


function pick(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

module.exports = { LETTERS, CATEGORY, pick };