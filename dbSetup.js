var r = require('rethinkdb')
    ;
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
    r.dbCreate('cackle').run(conn, function(err, result) {
        if (err) throw err;
        console.log('DB `cackle` was created successfully.');
    })

    //Create post table
    r.db('cackle').tableCreate('posts').run(connection, function(err, result) {
        if (err) throw err;
        console.log('Table `posts` was created successfully.');
    })

    //Create test post
    r.table('posts').insert({ title: "hello", content: "test content", author: "testuser", timestamp: 1234567 }).run(conn, function(err, result) {
        if (err) throw err;
        console.log('Test post created successfully.');
    })

});