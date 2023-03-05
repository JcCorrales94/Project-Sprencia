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
};

const updateById = (userId, body) => {
  const sql = 'update user set name = ?, surname = ?, city = ?, email = ?, password = ? where id = ?'
  const arr = [body.name, body.surname, body.city, body.email, body.password, userId]

  return executeQuery(sql, arr)
};

const updateByIdAdmin = (userId, body) => {
  const sql = 'update user set name = ?, surname = ?, city = ?, email = ?, password = ?, role = ?, status = ? where id = ?'
  const arr = [body.name, body.surname, body.city, body.email, body.password, body.role, body.status, userId]

  return executeQuery(sql, arr)
};

const getAll = () => {
  const sql = 'Select * from user'

  return executeQuery(sql)
};

module.exports = {
  create, getByEmail, getById, getAll, updateById, updateByIdAdmin
};