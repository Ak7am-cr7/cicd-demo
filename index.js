const http = require("http");
const { totalExpenses } = require("./app");

const items = [{ amount: 100 }, { amount: 250 }, { amount: 75 }];

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Total expenses: ${totalExpenses(items)}\n`);
});

server.listen(3000, () => console.log("Server running on port 3000"));