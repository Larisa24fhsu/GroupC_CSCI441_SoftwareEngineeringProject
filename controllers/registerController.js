const pool = require('../db');  // Assuming you have a database connection in db.js

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    console.log('Request body:', req.body); // Debug log

    // Validate input
    if (!username || !password || !repeatPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== repeatPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        // Check if the username already exists
        const userExists = await pool.query('SELECT * FROM useraccount WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'Username already exists.' }); // Conflict
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Query:', 'INSERT INTO useraccount (username, password) VALUES ($1, $2)');
        console.log('Parameters:', [username, hashedPassword]);

        // Insert the new user into the database
        await pool.query(
            'INSERT INTO useraccount (username, password) VALUES ($1, $2)',
            [username, hashedPassword] // Default role is 'user'
        );

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { handleRegister };