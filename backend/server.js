import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/product.route.js';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: ['http://localhost:5174', 'https://mern-flipzon.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', router);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

const startServer = async () => {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
                server.listen(PORT + 1);
            } else {
                console.error('Server error:', error);
            }
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();




