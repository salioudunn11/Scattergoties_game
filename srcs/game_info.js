export const LETTERS = "ABCDEFGHIJKLMNOPRST".split("");

export const CATEGORY = [
  "Cities",
  "Foods",
  "Movies",
  "Soccer Players",
  "Countries",
  "Basketball Players",
  "Video Games",
  "Animals",
];

export function pick(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}