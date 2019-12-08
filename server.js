const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use("/static", express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/success", (req, res) => {
  res.render("success");
});

app.listen(3000, () => console.log("Server is running..."));
