const test = require("node:test");
const assert = require("node:assert");
const { totalExpenses } = require("./app");

test("adds up all expenses", () => {
    const items = [{ amount: 100 }, { amount: 250 }];
    assert.strictEqual(totalExpenses(items), 350);
});