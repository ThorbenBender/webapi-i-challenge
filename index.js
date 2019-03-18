// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {});

server.get('/api/users', (req, res) => {
	let users = db.find().then((users) => {
		res.status(200).json(users);
	});
});

server.get('/api/users/:id', (req, res) => {});

// server.delete('/', (req, res) => {
// 	res.json({});
// });

// server.put('/', (req, res) => {
// 	res.json({});
// });

server.listen(8000, () => console.log('Listening on port 8000'));
