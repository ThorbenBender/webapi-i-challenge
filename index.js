// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
	if (!req.body.name || !req.body.bio) {
		res.status(400).json({ message: 'The user with the specified ID does not exist.' });
	} else {
		db.insert(req.body).then((user) => res.status(201).json(user)).catch((err) => res.status(500).json({ error: err }));
	}
});

server.get('/api/users', (req, res) => {
	db
		.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => res.status(500).json({ error: err }));
});

server.get('/api/users/:id', (req, res) => {
	db.findById(req.params.id).then((user) => res.json(user)).catch((err) => res.status(404).json({ message: err }));
});

server.delete('/api/users/:id', (req, res) => {
	db.remove(req.params.id).then((users) => res.json(users)).catch((err) => res.status(404).json({ message: err }));
});

server.put('/api/users/:id', (req, res) => {
	if (!req.params.id) {
		res.status(404).json({ message: 'The user with the specified ID does not exist.' });
	} else if (!req.body.name || !req.body.bio) {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		db
			.update(req.params.id, req.body)
			.then((count) => res.status(200).json(count))
			.catch(() => res.status(500).json({ error: 'The user information could not be modified.' }));
	}
});

server.listen(8000, () => console.log('Listening on port 8000'));
