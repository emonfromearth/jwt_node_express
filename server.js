require('dotenv').config(); // so that we can use .env file's variables

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// so that we can use json from the body
app.use(express.json());

const posts = [
    {
        username: 'Emon',
        title: 'This is post 1'
    },
    {
        username: 'Kemon',
        title: 'This is post 2'
    }
];

app.get('/posts', (req, res) => {
    res.json(posts)
});

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})
});

app.listen(3000)