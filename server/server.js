import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const clientUrl = process.env.CLIENT_URL;
app.use(cors({
  origin: clientUrl ? [clientUrl, 'http://localhost:5173', 'http://localhost:3000',"https://mukest-website.vercel.app/"] : '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'Welcome to LensCraft Admin API Server' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
