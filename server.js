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

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(posts => posts.username === req.user.name))
});

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})
});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}
app.listen(3000)