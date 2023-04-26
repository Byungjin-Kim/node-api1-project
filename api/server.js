// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.get('/', (req, res) => {
    // name is not important (could be request, response), position is.
    res.json({ hello: 'world' })
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(error => {
            res.status(500).json({
                message: 'error getting user',
                error: error.message,
                stack: error.stack,
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}


