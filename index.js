const express = require('express');
const app = express();
const morgan = require('morgan');

// Mock Data
let topBooks = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling'
    },
    {
      title: 'Lord of the Rings',
      author: 'J.R.R. Tolkien'
    },
    {
      title: 'Twilight',
      author: 'Stephanie Meyer'
    }
  ];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to Bookshelf!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', 
    { root:__dirname});
});

app.get('/books', (req, res) => {
    res.json(topBooks);
});

// Use Morgan
app.use(morgan('common'));

// Server static files
app.use(express.static('public'));

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// listen for requests
app.listen(1313, () => {
    console.log('App is listening on port 1313');
});