const pg = require("pg");
require("dotenv").config();

const db = new pg.Client({
    user: process.env.PG_USER,
    localhost: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

module.exports = db;