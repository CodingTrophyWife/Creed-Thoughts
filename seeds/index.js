const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const users = [
    {
        username: "cyndilove",
        password: "password",
    },{
        username: "emilylove",
        password: "password",
    },
];

const blogs = [
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
        contents: "Makes Sense.",
        user_id: 1,
        blog_id: 1,
    },{
        contents: "So who are you?",
        user_id: 2,
        blog_id: 1,
    },
];

const startSeedin = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.bulkCreate(users, { individualHooks: true });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        
        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

startSeedin();