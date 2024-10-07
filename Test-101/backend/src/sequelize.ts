
import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'Test-101',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'Password123#@!',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);
console.log(sequelize,"dasdas");

// Optionally, test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
