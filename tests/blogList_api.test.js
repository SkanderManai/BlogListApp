const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./testHelper");
const Blog = require("../models/Blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are retrieved", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(testHelper.initialBlogs.length);
});

test("unique identifier is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  //  .log(blogsAtEnd);

  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);

  expect(titles).toContain("Canonical string reduction");
});

test("likes default to zero if not specified", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const response = await api.get("/api/blogs");

  expect(response.body[response.body.length - 1].likes).toBe(0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await testHelper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await testHelper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
