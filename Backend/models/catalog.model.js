const { executeQuery, executeQueryOne } = require('../helpers/utils');

const create = ({ image, description, summary, schedule, price }) => {
  const sql = ' Insert into catalog(image, description, summary, schedule, price, sales) values(?, ?, ?, ?, ?, ?)'
  const arr = [image, description, summary, schedule, price, 0]

  return executeQuery(sql, arr)
}

const getAll = () => {
  const sql = 'Select * from catalog'

  return executeQuery(sql)
}

const updateById = (catalogId, body) => {
  const sql = 'Update catalog set image = ?, description = ?, summary = ?, schedule = ?, price = ? where id = ?'
  const arr = [body.image, body.description, body.summary, body.schedule, body.price, catalogId]

  return executeQuery(sql, arr)
}

const deleteCatalog = (catalogId) => {
  const sql = 'delete from catalog where id = ?'
  const arr = [catalogId]

  return executeQueryOne(sql, arr)
}

module.exports = {
  create, getAll, updateById
} 