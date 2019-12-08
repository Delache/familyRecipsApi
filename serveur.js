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
      res.status(500).send('Erreur lors de la récupération d\'un utilisateur');
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
  const idRecip = req.params.id;
  connection.query('DELETE FROM user WHERE id = ?', [idRecip], err => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression d'un utilisateur");
    } else {
      res.sendStatus(204);
    }
  });
});

// Routes Recips

app.get('/api/recips', (req, res) => {
  connection.query('SELECT * from recip', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération d\'une recette')
    } else {
      res.json(results);
    }
  });
})

app.post('/api/recips', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO recip SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la sauvegarde d\'une recette');
    } else {
      res.sendStatus(204);
    }
  });
});

app.put('/api/recips/:id', (req, res) => {
  const idRecip = req.params.id;
  const formData = req.body;
  connection.query('UPDATE recip SET ? WHERE id = ?', [formData, idRecip], err => {
    if (err) {
      res.status(500).send('Erreur lors de la modification d\'une recette');
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete('/api/recips/:id', (req, res) => {
  const idRecip = req.params.id;
  connection.query('DELETE FROM recip WHERE id = ?', [idRecip], err => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression d\'une recette');
    } else {
      res.sendStatus(204);
    }
  });
});

app.get('/api/recips', (req, res) => {
  connection.query('SELECT * from recip', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération d\'une recette');
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

