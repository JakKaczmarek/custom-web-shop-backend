import {
  randomPriceTest,
  getRandomNameBaseOneTest,
  getParamsFromUrl,
} from "./utils.js";

describe("Utils test", () => {
  it("It should return random number beetwen 1-100", () => {
    expect(randomPriceTest(1, 100)).toBeGreaterThanOrEqual(1);
    expect(randomPriceTest(1, 100)).toBeLessThanOrEqual(100);
  });
  it("If test1 and test2 are objects, function should return string", () => {
    const test1 = ["test", "test2", "test3"];
    const test2 = ["javascript", "javascript2", "javascript3"];
    const myFunction = getRandomNameBaseOneTest(test1, test2);
    expect(
      typeof test1 === "object" &&
        typeof test2 === "object" &&
        typeof myFunction === "string"
    ).toBe(true);
  });
  it("It should retrun object from url", () => {
    const url = "http://localhost:3000/bikes?limit=4&page=2";
    expect(getParamsFromUrl(url)).toStrictEqual({ limit: "4", page: "2" });
  });
});
