import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import clientRoutes from './routes/client.js';
import salesRoutes from './routes/sales.js';
import managmentRoutes from './routes/managment.js';
import generalRoutes from './routes/general.js';


mongoose.set('strictQuery', true);

dotenv.config();
const app = express();
app.use (helmet());
app.use (express.json());
app.use (helmet.crossOriginResourcePolicy());
app.use (morgan('common'));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: false }));
app.use (cors());

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);
app.use("/managment", managmentRoutes);




const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>{
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(error.message));