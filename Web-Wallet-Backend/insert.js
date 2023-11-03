const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'postgres',
    port: 5432
});

const addUser = async (lastname, firstname, address, city) => {
    try {
        await client.connect();
        await client.query(
            `INSERT INTO "users" ("lastname", "firstname", "address", "city")
            VALUES ($1, $2, $3, $4)`, [lastname, firstname, address, city]);
        console.log("User Added. . .");
            return true;
    } catch {
        console.log("err");
    }

}

addUser("Badar", "Saleem", "Block Y","Islamabad ");