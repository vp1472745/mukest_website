import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import routes from './routes/index.routes.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static frontend assets in production (Unified deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    } else {
      res.status(404).json({ success: false, message: 'API endpoint not found' });
    }
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LensCraft Admin API Server' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
