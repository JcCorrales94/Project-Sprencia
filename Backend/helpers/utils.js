// * Insertamos y requerimos las librerís necesasrias para el Token
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken')


// * Ejecuta una sentancia sql contra la BBDD y nos devuelve un array con el resultado
//* @param{string} sql
//* @param{any[]} arr
//* @returns


const executeQuery = (sql, arr = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, arr, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

//* Ejecuta una sentencia contra la BBDD y me devuleve un objeto
//* @param{string} sql
//* @param{any[]} arr
//* @returns

const executeQueryOne = (sql, arr = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, arr, (err, result) => {
      if (err) reject(err);
      if (result.length === 0) resolve(null);
      resolve(result[0]);
    });
  });
};


// * Creamos el token

const createToken = (user) => {
  const payload = {
    user_id: user.user_id,
    role: user.role,
    status: user.status,
    exp_date: dayjs().add(60, 'minute').unix()
  }
  return jwt.sign(payload, 'sprencia proyecto de la camara de comercio de Valencia y del Team Ironman')
}




module.exports = {
  executeQuery, executeQueryOne, createToken
}