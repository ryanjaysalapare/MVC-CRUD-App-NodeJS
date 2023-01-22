// StAuth10222: I Ryan Jay Salapare, 000823653 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.
const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js')

// Displays the login page
router.get("/", async function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", async function(req, res)
{
  const result = await UsersModel.authenticateUser(req.body.username, req.body.password);

  if (result.length ==0)
  {
    // if we have an error, reload the login page with an error
    req.session.login_error = "Invalid username and/or password!";
    res.redirect("/login");
  }else {

    if(req.body.username == result[0].username && req.body.password == result[0].password && result[0].level == "member")
    {
      // set a session key username to login the user
      req.session.username = result[0].username;
      req.session.memberlevel = result[0].level;
      
      // re-direct the logged-in user to the members page
      res.redirect("/members");

    } else if(req.body.username == result[0].username && req.body.password == result[0].password && result[0].level == "editor")
    {
      // set a session key username to login the users
      req.session.username = result[0].username;
      req.session.memberlevel = result[0].level;

      // re-direct the logged-in user to the editors page
      res.redirect("/editors");
    }
  
  }
});


// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
  delete(req.session.username);
  res.redirect("/home");
});

module.exports = router;
