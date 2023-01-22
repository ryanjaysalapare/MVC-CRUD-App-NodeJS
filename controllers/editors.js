// StAuth10222: I Ryan Jay Salapare, 000823653 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.
const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');
const UsersModel = require('../models/users.js')

// Display the editors page
router.get("/", async function(req, res)
{

  const currentUsers = await UsersModel.getAllUsers();
  req.TPL.allUsers = currentUsers;

  const currentArticles = await ArticlesModel.getSpecificArticle();
  req.TPL.allArticles = currentArticles;
  
  res.render("editors", {articles: req.TPL.allArticles, users: req.TPL.allUsers});
});

router.get("/deletearticle/:id", async function(req,res) {
  
  //delete article 
  await ArticlesModel.deleteArticle(req.params.id);
  const articlesArray = await ArticlesModel.getSpecificArticle();

  const currentUsers = await UsersModel.getAllUsers();
  req.TPL.allUsers = currentUsers;

  res.render("editors", { articles: articlesArray, users: currentUsers});
});

router.get('/deleteSpecificArticle/:id/:username', async function(req,res) {

  //delete user
  await UsersModel.deleteUser(req.params.id);
  const usersArray = await UsersModel.getAllUsers();
  req.TPL.usersAfterDeletion = usersArray;
  
  //Delete articles from that user 
  await ArticlesModel.deleteSpecificUserArticle(req.params.username);
  const articlesArray = await ArticlesModel.getSpecificArticle();

  res.render("editors", { users: usersArray, articles: articlesArray});

});

module.exports = router;
