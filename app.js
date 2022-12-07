// ./app.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const inputFieldName = "username";
let requestCounter = 0;

// work for all requests that start with slash after the domain
app.use("/", (req, res, next) => {
  console.log(
    `Middleware in the first app.use!, get request ${++requestCounter} times!`
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

// request's path has to be exact match /user
app.post("/user", (req, res, next) => {
  res.send(`<p>Got the POST request, 
    The username is: ${req.body[inputFieldName]}</p>`);
});

// request not just filtering by HTTP method but also by path
app.get("/", (req, res, next) => {
  res.send(`
  <form action="/user" method="POST">
    <input type="text" name="${inputFieldName}" />
    <button type="submit">Create User</button>
  </form>
    `);
});

app.listen(5000, () => {
  console.log("Server running at port 5000...");
});
