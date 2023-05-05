import r from 'rethinkdb';

const dbConfig = {
  host: '172.17.0.2',
  port: 28015,
  db: 'cackle'
};

const connect = async () => {
  const conn = await r.connect(dbConfig);
  return conn;
};

export default connect;
