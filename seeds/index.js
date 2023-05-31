const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const users = [
    {
        username: "cyndilove",
        password: "password",
    },{
        username: "emilylove",
        password: "password",
    },
];

const posts = [
    {
        title: "Cults",
        body: "I've been involved in a number of cults, both as a leader and a follower. You have more fun as a follower. But, you make more money as a leader.",
        user_id: 1,
    },{
        title: "Stealing",
        body: "Nobody steals from Creed Bratton and gets away with it. The last person to do this disappeared. His name? Creed Bratton.",
        user_id: 2, 
    },
];

const comments = [
    {
        body: "Makes Sense.",
        user_id: 1,
        post_id: 1,
    },{
        body: "So who are you?",
        user_id: 2,
        post_id: 1,
    },
];

const startSeedin = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.bulkCreate(users, { individualHooks: true });
        await Post.bulkCreate(posts);
        await Comment.bulkCreate(comments);
        
        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

startSeedin();