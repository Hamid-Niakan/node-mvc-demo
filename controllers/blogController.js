/*
    naming convention:
    blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
*/

const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((e) => {
      console.log(e);
    });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((e) => {
      console.log(e);
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((e) => {
      res.status(404).render("404", { title: "404" });
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_details,
  blog_delete,
};
