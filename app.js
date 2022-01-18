const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Item 1",
});
const item2 = new Item({
  name: "Item 2",
});
const item3 = new Item({
  name: "Item 3",
});

app.get("/", function (req, res) {
  // Date Function
  // const day = date.getDate();

  Item.find({}, (err, fonudItems) => {
    if (fonudItems.length === 0) {
      const defaultItems = [item1,item2,item3];
      Item.insertMany(defaultItems,(err)=>{
        if(err){
          console.log(err);
        }else{
          console.log("Successfully inserted default items");
        }
      })
      res.redirect("/");
    }
    else{
      res.render("list", { listTitle: "Today", newListItems: fonudItems });
    }
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
