import express from 'express'
import dotenv  from 'dotenv'
import connectDB from './config/db.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser';

dotenv.config()

connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

app.use(notFound)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('API is running....!!!')
})

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`server running ${process.env.NODE_ENV} mode on port ${PORT}`))