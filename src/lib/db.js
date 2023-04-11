import mysql from 'mysql2/promise'

// TODO: Replace plain text password with .env
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cackle'
});

export default connection