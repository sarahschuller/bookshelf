const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

// Use Morgan
app.use(morgan('common'));

// Server static files
app.use(express.static('public'));

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Body Parser
app.use(bodyParser.json());

// Mock Data
let books = [
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

let users = [
    {
        id: 1,
        name: "Kim",
        favoriteBooks: []
    },

    {
        id: 2,
        name: "Bob",
        favoriteBooks: []
    },
]

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

app.post('/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    }else{
        res.status(400).send('users need names')
    }
})

app.post('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    }else{
        res.status(400).send('user not found')
    }
})

// listen for requests
app.listen(1313, () => {
    console.log('App is listening on port 1313');
});