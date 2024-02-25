import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan';

import {logger} from "./helpers/winstonLogger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
})
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use(helmet());
app.use(compression());


import userRoute from './routes/UserRoute.js'
import authRoute from './routes/AuthRoute.js'
import locationRoute from './routes/LocationRoute.js'

import {ErrorHandler} from "./middlewares/ErrorHandler.js";

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/locations', locationRoute)

app.use(ErrorHandler)


import {connectToDatabase} from './server.js';

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log('Connection error', err)
    })

export default app