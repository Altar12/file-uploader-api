require('dotenv').config();
require('express-async-errors');
const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./database/connect');
const defaultHandler = require('./middlewares/default-handler');
const errorHandler = require('./middlewares/error-handler');
const productsRouter = require('./routes/productsRoute');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const app = express();
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use('/api/v1/products', productsRouter);
app.use(defaultHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async (req, res) => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
        console.error('Error starting server', error);
    }
};

start();

