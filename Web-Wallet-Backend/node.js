const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'postgres',
  port: 5432,
});

const insertUser = async (userName, userRole) => {
  try {
    await client.connect();           // gets connection
    await client.query(
      `INSERT INTO "users" ("name", "email")  
           VALUES ($1, $2)`, [userName, userRole]); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end();               // closes connection
  }
};



insertUser('umer','umer@gmail123.com');
