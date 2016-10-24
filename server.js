const express = require('express');
const app = express();
const path = require('path');
var favorites = require('./routes/favorites');
var bodyParser = require('body-parser');

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.disable('etag');

app.use('/favorites', favorites);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.listen(3000);
