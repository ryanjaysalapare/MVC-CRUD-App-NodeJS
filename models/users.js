// StAuth10222: I Ryan Jay Salapare, 000823653 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.
var sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
}

startup();

// Return all articles
async function authenticateUser(username, password)
{
  const results = db.all("SELECT username, password, level FROM Users WHERE username =? AND password=?", [username, password]);

  return results;
}

//Create a new user given a username, password
async function createUser(username, password)
{ 
  var level = "member";
  await db.run("INSERT INTO Users VALUES (?,?,?)",
               [username, password, level]);
}

async function getAllUsers()
{
  const results = db.all("SELECT rowid, *  FROM Users");

  return results;
}

async function deleteUser(id){
  await db.run("DELETE FROM Users WHERE rowid=?", id);
}

module.exports = {authenticateUser,createUser,getAllUsers,deleteUser};