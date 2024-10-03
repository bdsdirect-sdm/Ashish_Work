import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRouts';

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api', userRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;