import { ADJECTIVES, NOUNS } from "./adjectives-nouns";

// Alternative solutions https://stackoverflow.com/a/37511463/140927
export function normalizeName(name) {
  return name
    .toLowerCase()
    .split(/[^a-z0-9]+/gim)
    .filter((s) => s.length > 0)
    .join("-");
}

export function generateName() {
  // function capFirst(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1)
  // }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    ADJECTIVES[getRandomInt(0, ADJECTIVES.length + 1)] +
    "-" +
    NOUNS[getRandomInt(0, NOUNS.length + 1)] +
    "-" +
    getRandomInt(1, 99)
  );
}
