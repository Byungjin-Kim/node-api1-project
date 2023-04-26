// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());



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
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({
                message: 'error getting user',
                error: error.message,
                stack: error.stack,
            })
        })
})

server.post('/api/users', async (req, res) => {
    const user = req.body;

    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        try {
            const newlyCreatedUser = await User.insert(user);
            res.status(201).json(newlyCreatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});

server.put('/api/users/:id', async (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    try {
        const possibleUser = await User.findById(id);
        if (!possibleUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            if (!changes.name || !changes.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                const updatedUser = await User.update(id, changes);
                res.status(200).json(updatedUser);
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    User.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json(deleted);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
});

module.exports = server;


