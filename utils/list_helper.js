const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let maxLikes = 0;
  let maxIndex = 0;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      maxIndex = i;
    }
  }

  const result = {
    title: blogs[maxIndex].title,
    author: blogs[maxIndex].author,
    likes: blogs[maxIndex].likes,
  };

  return result;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return {};
  }

  const authorCount = _.countBy(blogs, (blog) => blog.author);
  // console.log(authorCount);
  let result = {
    author: "",
    blogs: 0,
  };
  for (let i in authorCount) {
    if (authorCount[i] > result.blogs) {
      result.author = i;
      result.blogs = authorCount[i];
    }
  }
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
