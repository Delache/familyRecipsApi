const express = require('express');
const connection = require('./conf.js')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// Routes Users
app.get('/api/users', (req, res) => {
  connection.query('SELECT * from user', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des employés');
    } else {
      res.json(results);
    }
  });
})

app.post('/api/users', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO user SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un utilisateur");
    } else {
      res.sendStatus(204);
    }
  });
});

app.put('/api/users/:id', (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query('UPDATE user SET ? WHERE id = ?', [formData, idUser], err => {
    if (err) {
      res.status(500).send("Erreur lors de la modification d'un utilisateur");
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete('/api/users/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('DELETE FROM user WHERE id = ?', [idUser], err => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression d'un utilisateur");
    } else {
      res.sendStatus(204);
    }
  });
});

// Routes Dish
app.get('/api/dishs', (req, res) => {
  connection.query('SELECT * from dish', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des employés');
    } else {
      res.json(results);
    }
  });
})

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});

