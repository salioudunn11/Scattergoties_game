const LETTERS = "ABCDEFGHIJKLMNOPRST".split("");

const CATEGORY = [
  "Cities",
  "Foods",
  "Movies",
  "Soccer Players",
  "Countries",
  "Basketball Players",
  "Video Games",
  "Animals",
];


function pick(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

module.exports = { LETTERS, CATEGORY, pick };