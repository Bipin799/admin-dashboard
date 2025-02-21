const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Read and merge both JSON files
const db1 = JSON.parse(fs.readFileSync(path.join(__dirname, "db1.json"), "utf-8"));
const db2 = JSON.parse(fs.readFileSync(path.join(__dirname, "db2.json"), "utf-8"));

const mergedData = { ...db1, ...db2 };

const router = jsonServer.router(mergedData);

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
