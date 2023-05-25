const router = require("express").Router();
const { Post, Comment, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
    });
    if (users.length < 1) {
      return res
        .status(404)
        .json({ message: "There are no users in your database" });
    } else {
      res.json(users);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = await User.findByPk(req.params.id, {
    });

    if (!userId) {
      res.status(404).json({ message: "No users found with that id!" });
      return;
    }

    res.status(200).json(userId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    const dbResponse = await User.create(newUser);

    if (req.body.postId) {
      await dbResponse.addPost(req.body.posId);
    }
    req.session.user_id = dbResponse.dataValues.id;
    req.session.logged_in = true;

    return res.status(200).json(dbResponse);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error occurred", err: err });
  }
});

router.put("/:id", (req, res) => {
  User.update(
    {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => res.json(err));
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }

    const passwordCheck = await userData.checkPassword(req.body.password);

    if (!passwordCheck) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }

    req.session.logged_in = true;
    req.session.user_id = userData.id;
    return res.render("homepage");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;