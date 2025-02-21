const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Read JSON files
const db1Path = path.join(__dirname, "db1.json");
const db2Path = path.join(__dirname, "db2.json");

const db1 = fs.existsSync(db1Path) ? JSON.parse(fs.readFileSync(db1Path, "utf-8")) : {};
const db2 = fs.existsSync(db2Path) ? JSON.parse(fs.readFileSync(db2Path, "utf-8")) : {};

// Merge the two JSON files
const mergedData = { ...db1, ...db2 };

// Create a router with merged data
const router = jsonServer.router(mergedData);

server.use(middlewares);
server.use(router);

// Set the PORT explicitly for Render
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
