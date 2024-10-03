import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRouts';
import path from 'path';

const app = express();


app.use(cors());
app.use(express.json());

app.use('/uploads',express.static(path.join(__dirname,'..', 'uploads')));

app.use('/api', userRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;