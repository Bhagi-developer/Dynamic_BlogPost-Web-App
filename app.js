//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/////////////MONGOOSE///////////////////
mongoose.connect(
  "mongodb+srv://admin-bhagi121:itsbhagixyzxy@cluster0.nobk3.mongodb.net/Test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const postSchema = {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
};

const Post = mongoose.model("Post", postSchema);

///////HOME GET////////////
app.get("/", function (req, res) {
  Post.find({}, function (err, rs) {
    if (!err) {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: rs,
      });
    }
  });
});

///////////ABOUT GET///////////////////
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

//////////////////CONTACT GET//////////////
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

////////////////COMPOSE GET///////////////
app.get("/compose", function (req, res) {
  res.render("compose");
});

//////////////COMPOSE POST///////////////
app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

////////////POST GET////////////////
app.get("/posts/:postName", function (req, res) {
  const requested = req.params.postName;

  Post.findOne({ _id: requested }, function (err, rs) {
    if (!err) {
      if (rs) {
        res.render("post", {
          title: rs.title,
          content: rs.content,
        });
      } else {
        res.render("pageNull");
      }
    } else {
      res.render("pageNull");
    }
  });

  // posts.forEach(function (post) {
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });
});

//////////////////////SERVER LISTEN//////////////////
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

// Copyright Cliam © 2021 Bhagirath Makwana
