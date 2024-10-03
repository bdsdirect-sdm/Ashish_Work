import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
    'PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE',
    'JWT_SECRET',
  ];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: Missing environment variable ${key}`);
    process.exit(1);
  }
});

export default {
    port: process.env.PORT || 5000,
    db: {
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_DATABASE!,
    },
    jwtSecret: process.env.JWT_SECRET!,
  };