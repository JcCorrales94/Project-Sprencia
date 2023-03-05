const { executeQuery, executeQueryOne } = require('../helpers/utils');

const create = (body) => {
  const sql = ' Insert into comment(user_id, activity_id, description, date) values(?, ?, ?, ?)';
  const date = new Date()
  const arr = [body.user_id, body.activity_id, body.description, date];
  return executeQuery(sql, arr)
};

const getAll = () => {
  const sql = 'Select * from comment'
  return executeQuery(sql)
};

const updateById = (commentId, body) => {
  const sql = 'Update catalog set description = ?, date = ? where id= ?';
  const date = new Date();
  const arr = [body.description, date, commentId];

  return executeQuery(sql, arr)
}

const deleteComment = (commentId) => {
  const sql = 'delete from comment where id = ?'
  const arr = [commentId]

  return executeQueryOne(sql, arr)
}

module.exports = {
  create, getAll, updateById
} 