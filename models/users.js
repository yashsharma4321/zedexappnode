import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,   // name required
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,   // email required
    unique: true,       // no duplicate emails
    validate: {
      isEmail: true     // email format validation
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false    // password required
  }
}, {
  tableName: 'users',
  timestamps: false,
  defaultScope: {
    attributes: { exclude: ['password'] }, // by default password hide
  }
});

export default User;
