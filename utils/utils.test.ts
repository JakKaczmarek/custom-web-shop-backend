import {
  getRandomNameBaseOneTest,
  randomPriceTest,
  getParamsFromUrl,
} from "./utils";

describe("getRandomNameBaseOneTest", () => {
  const nameBase1 = ["John", "Alice", "Bob"];
  const nameBase2 = ["Doe", "Smith", "Johnson"];

  it("should return a random name composed of two words", () => {
    const randomName = getRandomNameBaseOneTest(nameBase1, nameBase2);
    const nameComponents = randomName.split(" ");
    expect(nameComponents.length).toBe(2);
    expect(nameBase1).toContain(nameComponents[0]);
    expect(nameBase2).toContain(nameComponents[1]);
  });
});

describe("randomPriceTest", () => {
  it("should return a random price within the given range", () => {
    const minPrice = 10;
    const maxPrice = 50;
    const randomPrice = randomPriceTest(minPrice, maxPrice);
    expect(randomPrice).toBeGreaterThanOrEqual(minPrice);
    expect(randomPrice).toBeLessThanOrEqual(maxPrice);
  });
});

describe("getParamsFromUrl", () => {
  it("It should retrun object from url", () => {
    const url = "http://localhost:3000/bikes?limit=4&page=2";
    expect(getParamsFromUrl(url)).toStrictEqual({ limit: "4", page: "2" });
  });
});
