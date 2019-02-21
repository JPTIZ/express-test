const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'partials'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

const posts = require('./posts');

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/help', (req, res) => {
    const user = users[0];

    res.render('help.hbs', {
        user,
        currentYear: new Date().getFullYear(),
    });
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        res.status(404).send(`Post with id ${id} does not exist.`);
    }

    res.send(post)
});

app.put('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    post.title = req.body.title;
    post.body = req.body.body;

    res.send(posts);
});

app.delete('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    const index = posts.indexOf(post);
    posts.splice(index, 1);

    res.send(posts);
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});