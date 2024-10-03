import 'reflect-metadata';
import { AppDataSource } from './data-source';
import app from './App';
import config from './utils/validateEnv';

const PORT = config.port;

// Initialize TypeORM connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });