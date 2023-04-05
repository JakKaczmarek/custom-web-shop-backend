const { sum } = require("./connect");

describe("Sum of two items", () => {
  it("It should return 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
