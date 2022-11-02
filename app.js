const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    title: 'index'
  });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => res.render('beers', { beers }))
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => res.render('random-beers', beer[0]))
    .catch(error => console.log(error));
});

app.get('/beers/beer:id', (req, res) => {
  console.log(req.params);
  punkAPI
    .getBeer(req.params.id)
    .then(beer => res.render('beer', beer[0]))
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('http://localhost:3000 🏃‍ on port 3000'));
