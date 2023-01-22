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

// Return all of the articles
async function getAllArticles()
{
  const results = db.all("SELECT * FROM Articles");
  return results;
}


async function getSpecificArticle()
{
  const results = db.all("SELECT rowid, title, username FROM Articles");
  return results;
}

// Create a new article given a title, content and username
async function createArticle(article,username)
{ 
  await db.run("INSERT INTO Articles VALUES (?,?,?)",
               [article.title, username, article.content]);
}

async function deleteArticle(id)
{
  await db.run("DELETE FROM Articles WHERE rowid=?", id);
}

async function deleteSpecificUserArticle(username){
  const results = db.all("SELECT rowid, username FROM Articles WHERE username=?", username);

  if(results != null)
  {
    await db.run("DELETE FROM Articles WHERE username=?", username);
  }
  
}

module.exports = {getAllArticles,createArticle,getSpecificArticle,deleteArticle,deleteSpecificUserArticle};
