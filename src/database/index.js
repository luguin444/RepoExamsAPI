const {Pool} = require('pg');

const db = new Pool({
    connectionString: process.env.DATABASE_URI,
    ssl: {rejectUnauthorized: false}
});

module.exports = db;