const fs = require("fs");

const userName = "Light";

fs.writeFile("./user-data.txt", "Name: " + userName, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Wrote file successfully!");
});
