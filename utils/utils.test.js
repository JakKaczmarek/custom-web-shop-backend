const utils = require("./utils");

describe("Utils test", () => {
  it("It should return random number beetwen 1-100", () => {
    expect(utils.randomPrice(1, 100)).toBeGreaterThanOrEqual(1);
    expect(utils.randomPrice(1, 100)).toBeLessThanOrEqual(100);
  });
  it("If test1 and test2 are objects, function should return string", () => {
    const test1 = ["test", "test2", "test3"];
    const test2 = ["javascript", "javascript2", "javascript3"];
    const myFunction = utils.getRandomNameBaseOne(test1, test2);
    expect(
      typeof test1 === "object" &&
        typeof test2 === "object" &&
        typeof myFunction === "string"
    ).toBe(true);
  });
});
