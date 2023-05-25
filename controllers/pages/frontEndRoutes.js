const router = require("express").Router();
const { Post, User } = require("../../models");

var logged;

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/");
  }
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    Post.findAll({
      include: [User],
    }).then((postData) => {
      const hbsData = postData.map((post) => post.get({ plain: true }));
      console.log(hbsData);
      res.render("homepage", {
        allPosts: hbsData,
        logged_in: req.session.logged_in,
      });
    });
  } else {
    someObj = {};
    res.render("login");
  }
});

router.get("/sign_up", async (req, res) => {
  try {
    res.render("sign_up");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.get("/posts", async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render("posts_overview", { logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "an error occured", err: err });
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/CreatePost", async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render("create_posts", { logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "an error occured", err: err });
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [User],
  }).then((dbResponse) => {
    const taskData = dbResponse.get({ plain: true });
    console.log("taskData:", taskData);
    res.render("edit_post", taskData);
  });
});

module.exports = router;