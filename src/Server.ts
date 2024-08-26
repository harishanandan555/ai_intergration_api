const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
var portfinder = require('portfinder');
import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
const swaggerUi = require('swagger-ui-express');
const { exec } = require('child_process');
// const axios = require('axios');
// const cron = require('node-cron');

import './LoadEnv';
import  CORS from "../src/providers/cors";
import MongodbPool from './pool/mongodb';
import BaseRouter from './routes/index';
import {logger} from './shared/Logger';
import events from './events';
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
const swaggerDocument = require('./swagger');

const app = express();

declare global {
    namespace Express {
        interface Request {
            pythonResponseCache?: any;
        }
    }
}

async function main() {
    try {

        // Initialize MongoDB connections
        async function dbConnection() {
            try{
                const mongodbPool = new MongodbPool(process.env)
                return mongodbPool;
            }
            catch (error) {
                console.error('Error occurred during MongoDB connection:', error);
                logger.error('Error occurred during MongoDB connection:', error);
            }
        }
        const mongodbPool = await dbConnection()
        app.set('mongodbPool', mongodbPool);

        // Middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        if (process.env.NODE_ENV === 'development') {
            app.use(morgan('dev'));
        } else if (process.env.NODE_ENV === 'production') {
            app.use(helmet(
                /*{
                    contentSecurityPolicy: {
                      directives: {
                        "script-src": ["'self'", "example.com"],
                      },
                    },
                }*/
            ));
        }

        app.use(CORS.handle);

        // Swagger UI
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));

        // Routers
        app.use(`/`, BaseRouter);

        // //ai node
        // app.get('/optimize', async (req, res) => {
        //     const assets = await Asset.find();
        //     const allocation = await optimizeAssetAllocation(assets);
        //     res.json(allocation);
        // });
        
        // app.get('/diversify', async (req, res) => {
        //     const assets = await Asset.find();
        //     const diversifiedPortfolio = diversifyPortfolio(assets);
        //     res.json(diversifiedPortfolio);
        // });

        // //python integration
        // exec('python3 portfolio_optimizer.py', (error: any, stdout: any, stderr: any) => {
        //     if (error) {
        //         console.error(`Error executing script: ${error}`);
        //         return;
        //     }
        //     console.log(`Optimized Allocation: ${stdout}`);
        // });

        // //python integration
        // axios.post('http://localhost:5000/optimize', {
        //     feature1: [1.1, 1.0, 1.2],
        //     feature2: [0.9, 1.0, 0.8],
        //     feature3: [1.2, 1.1, 1.3],
        //     returns: [0.05, 0.07, 0.06]
        // })
        // .then((response: any) => {
        //     console.log('Optimal Asset Allocation:', response.data.optimal_allocation);
        // })
        // .catch((error: any) => {
        //     console.error('Error optimizing portfolio:', error);
        // });

        // Cron job to fetch data from Python endpoint and store it in req
        // cron.schedule('* * * * *', async (req: Request, res: Response) => {
        //     try {
        //         const response = await axios.get('http://localhost:5000');
        //         // Store Python response data in req
        //         app.set('pythonResponseCache', response.data);
        //         console.log('Response from Python:', response.data);
        //     } catch (error) {
        //         console.error('Error fetching from Python:', error);
        //     }
        // });

        // // Middleware to access stored Python response in req
        // app.use((req, res, next) => {
        //     // Access the stored Python response from app locals
        //     req.pythonResponseCache = app.get('pythonResponse');
        //     next();
        // });


        // Error handling middleware
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        });

        // Error handling middleware
        // app.use(errorHandler);
        // app.use(notFoundHandler);

        // Introduce a wait time before starting the server
        await new Promise(resolve => setTimeout(resolve, 3000)); // 5000 ms = 5 seconds

        async function port() {
            try{
                // Start the server
                if (process.env.NODE_ENV === 'development') {
                    portfinder.getPort((err: any, port: Number) => {
                        if (err) {
                            throw err;
                        }
                        app.listen(port, () => {
                            console.log('Express server started on port: ' + port);
                            logger.info('Express server started on port: ' + port);
                        });
                    });
                } else {
                    const port = Number(process.env.PORT || 3000);
                    app.listen(port, () => {
                        console.log('Express server started on port: ' + port);
                        logger.info('Express server started on port: ' + port);
                    });
                }
            }
            catch (error) {
                console.error('An error occurred Express server starting on port:', error);
                logger.error('An error occurred Express server starting on port:', error);
            }
        }
        await port()

        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            console.log('Uncaught Exception:', error);
            logger.error('Uncaught Exception:', error);
            // Add any additional error handling, such as sending an alert or notification
            // events.emit('sendmail_exception', {
            //     name: error.name,
            //     message: error.message,
            //     stack: error.stack,
            //     url: ``, //req.headers.origin + req.originalUrl
            //     payload: error
            // }, `ip`, `host`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (error: any) => {
            console.log('Unhandled Rejection:', error);
            logger.error('Unhandled Rejection:', error);
            // Add any additional error handling, such as sending an alert or notification
            // events.emit('sendmail_exception', {
            //     name: error.name,
            //     message: error.message,
            //     stack: error.stack,
            //     url: ``, //req.headers.origin + req.originalUrl
            //     payload: error
            // }, `ip`, `host`);
        });

    } catch (error) {
        console.error('An error occurred while starting the application:', error);
        logger.error('An error occurred while starting the application:', error);
        // Optionally, exit the process if the error is critical
        process.exit(1);
    }
}

main();


export default app;