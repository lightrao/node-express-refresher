const express = require("express");

const app = express();

// every incoming request or senting back response
// is funneled through a bunch of middleware functions

// you call next function if you don't want to send the response in
// this middleware but to forward the request to the next middleware in line.

// If you're not calling next, then any middleware after this middleware, if we had more than one, will not
// be reached by this request.

app.use((req, res, next) => {
  let body = "";
  req.on("end", () => {
    const userName = body.split("=")[1];
    if (userName) {
      req.body = { name: userName };
    }
    next();
  });
  req.on("data", (chunk) => {
    body += chunk;
  });
});

app.use((req, res, next) => {
  if (req.body) {
    res.send(`<p>Got the POST request!, 
    The username is: ${req.body.name}</p>`);
  } else {
    res.send(`
  <form method="POST">
    <input type="text" name="username" />
    <button type="submit">Create User</button>
  </form>
    `);
  }
});

app.listen(5000, () => {
  console.log("Server running at port 5000...");
});
