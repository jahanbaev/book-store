import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

export const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  role: { type: DataTypes.STRING, defaultValue: 'user' },
  isBanned: { type: DataTypes.BOOLEAN, defaultValue: false }
});
