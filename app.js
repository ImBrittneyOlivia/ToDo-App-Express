const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["food"];
let workItems = [];

//body parser
app.use(bodyParser.urlencoded({ extended: true }));

//tells happ to use ejs as its view engine
app.set("view engine", "ejs");

//styles
app.use(express.static("public"));

app.get("/", function(req, res) {
  let day = date();
  res.render("list", { listTitle: day, newListItems: items });
});

//pass data back from our web page to our server using post request
app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

//about route
app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Running on port 3000");
});
