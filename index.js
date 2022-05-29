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
    res.status(200).json(books);
});

app.get('/books/:title', (req, res) => {
    const { title } = req.params;
    const book = books.find(book => book.Title === title);
    if (book) {
        res.status(200).json(book);
    }else{
        res.status(400).send('Book not found')
    }
})

app.get('/books/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = books.find(book => book.Genre.Name === genreName ).Genre;
    if (book) {
        res.status(200).json(genre);
    }else{
        res.status(400).send('Genre not found')
    }
})

app.get('/books/authors/:authorName', (req, res) => {
    const { authorName } = req.params;
    const author = author.find(book => book.Author.Name === authorName ).Author;
    if (book) {
        res.status(200).json(author);
    }else{
        res.status(400).send('Author not found')
    }
})

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