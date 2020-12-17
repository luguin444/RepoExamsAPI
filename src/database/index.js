const {Pool} = require('pg');

const db = new Pool({
    connectionString: process.env.DB_URI,
    ssl: {rejectUnauthorized: false}
});

module.exports = db;