const router = require("express").Router();
const { Post, Comment, User } = require("../../models");


router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User, Comment],
    });
    if (posts.length < 1) {
      return res
        .status(404)
        .json({ message: "There are no posts in your database" });
    } else {
      res.json(posts);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const postID = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!postID) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.status(200).json(postID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      comment: req.body.content,
    };
    const dbResponse = await Post.create(newPost);

    await dbResponse.addUser(req.session.user_id);

    const formatData = await dbResponse.get({ plain: true });
    res.status(200).json(formatData);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      due_date: req.body.due_date,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedPost) => {
      res.json(deletedPost);
    })
    .catch((err) => res.json(err));
});

module.exports = router;