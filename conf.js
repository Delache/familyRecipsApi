const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  process.env.secret, // le mot de passe
database :  'family_recips' // le nom de la base de données
});
module.exports = connection;
