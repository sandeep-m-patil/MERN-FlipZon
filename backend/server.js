import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/product.route.js';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://mern-flipzon.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', router);

// Basic route for testing
app.get('/', (req, res) => {
    res.json('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});





