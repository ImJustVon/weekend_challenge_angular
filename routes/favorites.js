var router = require('express').Router();
var pg = require('pg');
var bodyParser = require('body-parser');

var config = {
  database: 'vaughn',
};

var pool = new pg.Pool(config);

//get the favorites COUNT
router.get('/count', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT COUNT(id) FROM favorites;', function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//getting all favorites
router.get('/list', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM favorites;', function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//creating new favorite
router.post('/', function (req, res) {
  console.log('req: ', req);
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO favorites (url, notes) VALUES ($1, $2)',
                  [req.body.url, req.body.notes],
                  function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

//UPDATE favorites
router.put('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE favorites SET notes=$2, url=$3 WHERE id=$1;',
                  [req.body.id, req.body.notes, req.body.url],
                  function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

//DELETE favorite
router.delete('/:id', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('DELETE FROM favorites WHERE id=$1;', [req.params.id],
                 function (err, result) {
                  done();
                  if (err) {
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                  }

                  res.sendStatus(204);
                  done();
                });
  });
});

module.exports = router;
