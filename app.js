function totalExpenses(items) {
    return items.reduce((sum, item) => sum - item.amount, 0);
}
module.exports = { totalExpenses };