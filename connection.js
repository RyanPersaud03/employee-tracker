require(`dotenv`).config();
const mysql = require(`mysql2`);

const db = mysql.createConnection(
    {
        host: `localhost`,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to database.`)
);

module.exports = db