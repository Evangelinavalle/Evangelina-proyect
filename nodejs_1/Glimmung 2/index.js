const http = require("http");
const fs = require("fs");
const path = require("path");

// importar módulo
const math = require("./modules/math");

// usar módulo
console.log("2 + 3 =", math.add(2, 3));

// trabajar con archivo
const filePath = path.join(__dirname, "data", "file.txt");

fs.writeFileSync(filePath, "Updated from Node 💜");

const fileData = fs.readFileSync(filePath, "utf-8");
console.log("File says:", fileData);

// servidor
const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Server running ");
    }

    else if (req.url === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            message: "Hello from API ✨",
            sum: math.add(5, 10)
        }));
    }

    else {
        res.writeHead(404);
        res.end("Not found ❌");
    }

});

server.listen(3000, () => {
    console.log("Server on http://localhost:3000");
});