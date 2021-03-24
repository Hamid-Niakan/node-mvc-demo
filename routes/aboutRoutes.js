const express = require("express");

const routes = express.Router();

routes.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

routes.get("/about-us", (req, res) => {
  res.redirect("/about");
});

module.exports = routes;
