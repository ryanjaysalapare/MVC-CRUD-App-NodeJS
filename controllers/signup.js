// StAuth10222: I Ryan Jay Salapare, 000823653 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.
const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js')

// Will display the signup page
router.get("/", async function(req, res)
{
  // if an error occurs during the form submit, display it and clear it from the session
  req.TPL.signuperror = req.session.signup_error;
  req.session.signup_error = "";

  req.TPL.signupmessage1 = req.session.signupmessage1;
  req.session.signupmessage1 = "";
  req.TPL.signupmessage2 = req.session.signupmessage2;
  req.session.signupmessage2 = "";
  req.TPL.signupmessage3 = req.session.signupmessage3;
  req.session.signupmessage3 = "";

  req.TPL.isnotblank = req.session.isnotblank;
  req.TPL.isaccountcreated = req.session.isaccountcreated;

  // render the signup page
  res.render("signup", req.TPL);
});


// Will attempt to signup a user
router.post("/attempttosignup", async function(req, res)
{
  var currentusername= req.body.username;
  var currentpassword= req.body.password;

    if(currentusername.replace(/ /g, "").length < 1 && currentpassword.replace(/ /g, "").length < 1){
        
        // if an error occurs, reload the signup page together with an error
        req.session.signup_error= "Username/password cannot be blank!";
        req.session.isnotblank = true;
        req.session.isaccountcreated = false;

        req.TPL.isnotblank = req.session.isnotblank;
        req.TPL.isaccountcreated = req.session.isaccountcreated;
        req.TPL.signupmessage1 = req.session.signupmessage1;
        req.TPL.signupmessage2 = req.session.signupmessage2;
        req.TPL.signupmessage3 = req.session.signupmessage3;
        req.TPL.signuperror = req.session.signup_error;

        res.render("signup", req.TPL);
    }else{
        await UsersModel.createUser(req.body.username, req.body.password);
        req.session.signupmessage1 = "User account created!";
        req.session.signupmessage2 = "Login";
        req.session.signupmessage3 = "to access you new account.";
        req.session.isaccountcreated = true;
        req.session.isnotblank = false;

        req.TPL.isnotblank = req.session.isnotblank;
        req.TPL.isaccountcreated = req.session.isaccountcreated;
        req.TPL.signupmessage1 = req.session.signupmessage1;
        req.TPL.signupmessage2 = req.session.signupmessage2;
        req.TPL.signupmessage3 = req.session.signupmessage3;
        req.TPL.signuperror = req.session.signup_error;

        res.render("signup", req.TPL);
    }
});


module.exports = router;
