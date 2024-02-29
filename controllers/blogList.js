const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  // console.log(body);

  const users = await User.find({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes) || 0,
    user: users[1]._id,
  });

  const savedBlog = await blog.save();

  users[1].blogs = users[1].blogs.concat(savedBlog._id);
  await users[1].save();

  response.status(201).json(savedBlog);
});

module.exports = blogRouter;
