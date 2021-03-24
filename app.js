const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const aboutRoutes = require("./routes/aboutRoutes");

// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb://geralt:Geralt123@cluster0-shard-00-00.amvgh.mongodb.net:27017,cluster0-shard-00-01.amvgh.mongodb.net:27017,cluster0-shard-00-02.amvgh.mongodb.net:27017/node-mvc?ssl=true&replicaSet=atlas-xpp78l-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000))
  .catch((e) => console.log(e));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// blog routes
app.use("/blogs", blogRoutes);

// about routes
app.use(aboutRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
