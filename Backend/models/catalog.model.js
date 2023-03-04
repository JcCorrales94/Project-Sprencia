const { executeQuery } = require('../helpers/utils')

const create = ({ image, description, summary, schedule, price }) => {
  const sql = ' Insert into catalog(image, description, summary, schedule, price, sales) values(?, ?, ?, ?, ?, ?)'
  const arr = [image, description, summary, schedule, price, 0]

  return executeQuery(sql, arr)
}

const getAll = () => {
  const sql = 'Select * from catalog'

  return executeQuery(sql)
}


module.exports = {
  create, getAll
}