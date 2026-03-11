import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database/db.js";

const datebase = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = datebase.insert("users");
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };

    datebase.insert("users", user);

    return res.writeHead(201).end("created user");
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
