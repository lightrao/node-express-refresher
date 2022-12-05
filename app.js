// ./app.js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Incoming request...");
  console.log("Request http method:", req.method);
  console.log("Request url:", req.url);

  if (req.method === "POST") {
    let body = "";
    req.on("end", () => {
      console.log("POST request data:", body);
      const userName = body.split("=")[1];
      res.end(`<p>Got the POST request!, The username is: ${userName}</p>`);
    });
    req.on("data", (chunk) => {
      body += chunk;
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.end(`
  <form method="POST">
    <input type="text" name="username" />
    <button type="submit">Create User</button>
  </form>
  `);
  }
});

server.listen(5000);
