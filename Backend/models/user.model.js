const { executeQuery, executeQueryOne } = require('../helpers/utils')

const create = ({ name, surname, city, email, password }) => {

  const sql = 'Insert into user(name, surname, city, email, password, role,  status) values(?, ?, ?, ?, ?, ?, ?)'
  const arr = [name, surname, city, email, password, 'regular', true]

  return executeQuery(sql, arr)
};

const getByEmail = (email) => {
  const sql = 'Select * from user where email = ?'
  const arr = [email]

  return executeQueryOne(sql, arr)
};

const getById = (id) => {
  const sql = 'Select * from user where id = ?'
  const arr = [id]

  return executeQueryOne(sql, arr)
}

module.exports = {
  create, getByEmail, getById
};