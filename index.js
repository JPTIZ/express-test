const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}`;

    console.log(log);
    fs.appendFile('server.log', `${log} :: ${req.url}\n`, (err) => {
        if (err) {
            console.err('Unable to append to server.log');
        }
    });

    next();
});

const users = [
    {name: 'Tiz'},
    {name: 'Trombeta'},
    {name: 'Coquinho'},
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/', (req, res) => {
    res.render('help.hbs', users);
});


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});