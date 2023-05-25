const User = require("./user");
const Comment = require("./comment");
const Post = require("./post");

Post.belongsToMany(User, {
  through: "PostUsers",
});
User.belongsToMany(Post, {
  through: "PostUsers",
});

Comment.belongsTo(Post, {
  onDelete: "CASCADE",
});
Post.hasMany(Comment);

Comment.belongsTo(User);

User.hasMany(Comment);

module.exports = { User, Comment, Post };