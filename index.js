import pool from './database.js';
import server from './server.js';
// import addUser from './user/add.js';
// import {hashString} from './utils/hash-string.js';

// const pool = require('./database');

// addUser({password: '124', username: 'matvey'}).then(data => console.log(data));
// hashString('124').then(data => console.log(data));

const HOSTNAME = process.env.SERVER_HOSTNAME ?? 'localhost';
const PORT = process.env.SERVER_PORT ?? 3000;

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

// pool.query('SELECT * FROM users').then(data => console.log(data.rows));
