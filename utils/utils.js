function getRandomNameBaseOneTest(nameBase1Valid, nameBase2Valid) {
  const randomIndex = Math.floor(Math.random() * nameBase1Valid.length);
  const randomIndexTwo = Math.floor(Math.random() * nameBase2Valid.length);
  const item =
    nameBase1Valid[randomIndex] + " " + nameBase2Valid[randomIndexTwo];
  return item;
}

function randomPriceTest(minPrice, maxPrice) {
  return Number(
    (Math.random() * Math.abs(maxPrice - minPrice) + minPrice).toFixed(2)
  );
}
function getParamsFromUrl(url) {
  const params = {};
  url
    .split("?")[1]
    .split("&")
    .forEach((pair) => {
      pair = pair.split("=").map(decodeURIComponent);
      if (pair && pair[0].length) {
        params[pair[0]] = pair[1];
      }
    });
  return params;
}

export { getRandomNameBaseOneTest, randomPriceTest, getParamsFromUrl };
