const express = require('express');
const app = express();

const posts = [
    {
        id: 1,
        title: 'Post 1',
        body: 'This is post 1'
    },
    {
        id: 2,
        title: 'Post 2',
        body: 'This is post 2'
    }
];

app.get('/', (req, res) => {
    res.json(posts)
});

app.listen(3000)