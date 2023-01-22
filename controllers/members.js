// StAuth10222: I Ryan Jay Salapare, 000823653 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.
const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');

// Display the members page
router.get("/", function(req, res)
{
  res.render("members", req.TPL);
});

// Create an article if the form has been submitted
router.post("/create", async function(req, res)
{

  // Create the article using the model method, pass req.body as a parameter
  // since it contains the title and content data.
  await ArticlesModel.createArticle(req.body,req.session.username);

  req.TPL.message = "Article successfully created!";
  res.render("members", req.TPL);

});

module.exports = router;
