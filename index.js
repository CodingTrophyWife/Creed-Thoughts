const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require("../Creeds-Thoughts/config/connection");
const hbs = exphbs.create({});

const routes = require('../Creeds-Thoughts/controllers');

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESS,
    cookie: {
        maxAge: 1000*60*60*2,
    
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(express.static("public"));

app.engine("handlebars",hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session(sess));

const allRoutes = require("../Creeds-Thoughts/controllers");
app.use(allRoutes);
const User = require("../Creeds-Thoughts/models/user");
const Comment = require("../Creeds-Thoughts/models/comment");

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:' + PORT));
  });
