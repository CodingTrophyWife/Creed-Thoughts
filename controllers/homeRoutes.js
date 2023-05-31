const express = require("express");
const router = express.Router();
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
    try {
        Post.findAll({
            include: [User],
        }).then((postData) => {
            const hbsData = postData.map((post) => post.get({ plain: true }));
            res.render("homepage", {
                pagetitle: "Creed Thoughts",
                allPosts: hbsData,
                logged_in: req.session.logged_in,
            });
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});


router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [User],
    }).then((projData) => {
        const hbsData = projData.get({ plain: true });
        hbsData.logged_id = req.session.logged_id;
        res.render("singlePost", hbsData);
    });
});
router.get("/comment/:id", (req, res) => {
    Comment.findByPk(req.params.id, {
        include: [User],
    }).then((projData) => {
        const hbsData = projData.get({ plain: true });
        hbsData.logged_id = req.session.logged_id;
        res.render("singlePost", hbsData);
    });
});

router.get("/create", (req, res) => {
    try {
        res.render("createpost", {
            pagetitle: "Your Dashboard",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        return res.redirect("/profile");
    }
    res.render("login", {
        pagetitle: "Creed Thoughts",
        logged_in: req.session.logged_in,
    });
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        return res.redirect("/profile");
    }
    res.render("signup", {
        pagetitle: "Creed Thoughts",
        logged_in: req.session.logged_in,
    });
});

router.get('/logout', (req, res) => {
    console.log("loggin out!!")
    try {
        res.redirect("login")
        req.session.destroy()
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

router.get("/profile", (req, res) => {
    try {
        Post.findAll({
            include: [
                {model: Comment, attributes: ["id", "body", "user_id", "post_id"], include: [User]},
                {model: User, attributes: ["username"]},
            ],
            attributes: ["id", "title", "body", "user_id"],
            where: {
                user_id: req.session.user_id
            }
        }).then((userPost) => {
            const hbsData = userPost.map(post => post.get({
                plain: true
            }));
            res.render("profile", {
                pagetitle: "Your Dashboard",
                posts: hbsData,
                username: req.session.username,
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

module.exports = router;