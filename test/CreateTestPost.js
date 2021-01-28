var r = require('rethinkdb')
;
const rethinkDbConnectionObject = {
    host: 'localhost',
    table: 'cackle',
    port: 28015
};

r.connect(rethinkDbConnectionObject, (err, conn) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    conn.use('cackle')
r.table('posts').insert({title:"hello", content:"content", author: "kiwiscripter", timestamp:1234567}).run(conn)
});