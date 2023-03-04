const mysqul = require('mysql2');

const pool = mysqul.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'LCiXoNgByuh334Q',
  port: 3306,
  database: 'sprencia'
})

global.db = pool;
