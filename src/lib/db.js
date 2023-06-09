import r from 'rethinkdb';
import dotenv from 'dotenv'
dotenv.config()

const dbConfig = {
  host: process.env.RETHINK_HOST,
  port: process.env.RETHINK_PORT,
  db: 'cackle'
};

const connect = async () => {
  const conn = await r.connect(dbConfig);
  return conn;
};

export default connect;
