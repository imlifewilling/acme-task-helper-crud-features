const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, BOOLEAN, ENUM } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const Task = conn.define('task', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  complete: {
    type: BOOLEAN,
    defaultValue: false
  },
  description: {
    type: STRING,
    defaultValue: 'no description'
  },
  difficulty: {
    type: ENUM('EASY', 'MEDIUM', 'HARD'),
    defaultValue: 'EASY'
  }
});

module.exports = {
  conn,
  Task
};
