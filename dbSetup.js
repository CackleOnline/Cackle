var r = require('rethinkdb')

const rethinkDbConnectionObject = {
    host: 'localhost',
    port: 28015
};

r.connect(rethinkDbConnectionObject, (err, conn) => {

    if (err) {
        console.error('Error:', err);
        return;
    }

    //create database
    r.dbCreate('cackle').run(conn, function (err, result) {
        if (err) throw err;
        console.log('DB `cackle` was created successfully.');
    })

    //Create post table
    r.db('cackle').tableCreate('posts').run(connection, function (err, result) {
        if (err) throw err;
        console.log('Table `posts` was created successfully.');
    })

    //Create test post
    r.table('posts').insert({ title: "hello", content: "test content", author: "test", timestamp: 1234567 }).run(conn, function (err, result) {
        if (err) throw err;
        console.log('Test post created successfully.');
    })

    r.db('cackle').tableCreate('users').run(connection, function (err, result) {
        if (err) throw err;
        console.log('Table `users` was created successfully.');
    })

    r.table('users').insert({ username: "test", email:"test@example.com", password: "$2b$12$ZlYBlPfgyqTxiUtJcb0SFu9TQ5x9jlONocsuLDrogWoomSr7Az7.q" }).run(conn, function (err, result) {
        if (err) throw err;
        console.log('Test user with password `test123` and username of `test` created successfully');
    });


    r.db('cackle').tableCreate('logins').run(connection, function (err, result) {
        if (err) throw err;
        console.log('Table `logins` was created successfully.');
    })

});