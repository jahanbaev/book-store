import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

export const Book = sequelize.define('Book', {
  title: DataTypes.STRING,
  price: DataTypes.FLOAT,
  description: DataTypes.TEXT,
  image: DataTypes.STRING
});
