import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { PORT } from './config/envConfig.js';
import connectDB from './config/dbConfig.js';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import cartRouter from './routes/cartRoutes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', productRouter);
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/cart', cartRouter)

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});
app.listen(PORT, ()=>{
    
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})