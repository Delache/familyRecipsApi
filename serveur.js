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


// Routes Users (voir routes recip plus bas dans la liste pour la quête)

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


// Quête odyssey redwire
//----------------------
// Routes Recips
// GET - Récupération de l'ensemble des données de ta table

app.get('/api/recips', (req, res) => {
  connection.query('SELECT * from recip', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des recettes')
    } else {
      res.json(results);
    }
  });
})
// GET (light) - Récupération de quelques champs spécifiques
app.get('/api/recips/lastposts', (req, res) => {
  connection.query('SELECT id, name, photo, date from recip order by date desc', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération d\'une recette')
    } else {
      res.json(results);
    }
  });
})

//GET - Récupération d'un ensemble de données avec un filtre "contient soupe"
app.get('/api/recips/soup', (req, res) => {
  connection.query("SELECT * from recip join category on category.id = recip.category_id where category.name like '%soupe%'", (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des recettes de soupes');
    } else {
      res.json(results);
    }
  });
})


//GET - Récupération d'un ensemble de données avec un filtre "commence par ..."
app.get('/api/recips/pies', (req, res) => {
  connection.query("SELECT * from recip where recip.name like 'tarte%'", (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des recettes de tarte')
    } else {
      res.json(results);
    }
  });
})
//GET - Récupération d'un ensemble de données avec un filtre "supérieur à ..."
app.get('/api/recips/ofthemonth', (req, res) => {
  connection.query("SELECT * FROM recips WHERE Month(Start_Date) = Month(getdate()) AND Month(End_Date) = Month(getdate()) ORDER BY recip.name, Start_Date", (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des recettes du mois')
    } else {
      res.json(results);
    }
  });
})

//GET - Récupération de données ordonnées (ascendant, descendant)L'ordre sera passé en tant que paramètre de la route

app.get('/api/recips/oldest', (req, res) => {
  connection.query('SELECT * from recip order by recip.date desc', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des recettes les plus anciennes')
    } else {
      res.json(results);
    }
  });
})

//POST - Sauvegarde d'une nouvelle entité
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

//PUT - Modification d'une entité
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

//PUT - Toggle du booléen
app.put('/api/recips/:id', (req, res) => {
  const idRecip = req.params.id;
  const formData = req.body;
  connection.query('UPDATE recip SET vege = !vege WHERE id = ?', [formData, idRecip], err => {
    if (err) {
      res.status(500).send('Erreur lors de la modification du type végétarien');
    } else {
      res.sendStatus(204);
    }
  });
});

//DELETE - Suppression d'une entité
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

//DELETE - Suppression de toutes les entités dont le booléen est false
app.delete('/api/recips', (req, res) => {
  const idRecip = req.params.id;
  connection.query('DELETE FROM recip WHERE vege = false', err => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression des recettes non végétariennes');
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});

