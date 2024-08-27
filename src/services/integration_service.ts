const mongoose = require('mongoose');
const { spawn } = require('child_process');
const tf = require('@tensorflow/tfjs');
// import * as tf from '@tensorflow/tfjs';
// import * as tfnode from '@tensorflow/tfjs-node';
// import ARIMA from 'javascript-arima';
const axios = require('axios');

import events from '../events';
import Helper from '../pool/helper';
import * as config from '../config';
import { Auth } from '../properties/auth';
import {logger} from '../shared/Logger';
import { TokenBody } from '../typings/interface';
import { randomString } from '../helpers';
import messages from '../constants';


export class IntegrationService {
    
    expReq?: any
    expRes?: any

    public async signinMethod(params: Auth): Promise<object> {
        
        let _response: any = {};
        
        return new Promise(async resolve => {
        
            try {
                
                const pool = Helper.mongodbpool()
                const _model = await pool.getModels('auth', process.env)
                const _mongodb = await pool.connectMongodb(process.env)
                const result = await _mongodb.collection('tbl_login_customer').find({}).toArray();
                
                if (result) {
                    _response = {
                        code: '000',
                        message: `hello ${params.name}`,
                        result: result
                    };
                }

            } catch (err: any) {
                _response = {
                    code: '500',
                    message: 'An error occurred during OTP validation.',
                    error: err.message
                };
            } finally {}

            resolve(_response);

        });

    }

    public async aiTest(params: any): Promise<object> {
        
        let _response: any = {};
        
        return new Promise(async resolve => {
        
            try {
                
                // // Generate some synthetic data for training.
                // const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
                // const ys = tf.tensor2d([3, 5, 7, 9], [4, 1]);

                // // Define a simple sequential model.
                // const model = tf.sequential();

                // // Add a single dense layer with one unit.
                // model.add(tf.layers.dense({units: 1, inputShape: [1]}));

                // // Compile the model using a mean squared error loss function and Adam optimizer.
                // model.compile({loss: 'meanSquaredError', optimizer: 'adam'});

                // // Train the model using the data.
                // model.fit(xs, ys, {epochs: 500}).then(() => {
                //     // Use the model to do inference on a new data point.
                //     model.predict(tf.tensor2d([5], [1, 1])).print();  // Should print a value close to 11.
                // });

                // // const model = tf.sequential();

                // // model.add(tf.layers.dense({ inputShape: [2], units: 1 }));
                // // model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

                // // const xs = tf.tensor2d([[1400, 3], [1600, 3], [1700, 2], [1875, 3]], [4, 2]);
                // // const ys = tf.tensor2d([245000, 312000, 279000, 308000], [4, 1]);

                // model.fit(xs, ys, { epochs: 500 }).then(() => {
                //     model.predict(tf.tensor2d([[2000, 4]], [1, 2])).print();
                // });

                _response = {
                    code: '000',
                    message: `hello ${params.name}`,
                    // result: model
                };
                
            } catch (err: any) {
                _response = {
                    code: '500',
                    message: 'An error occurred during OTP validation.',
                    error: err.message
                };
                throw err;
            } finally {}

            resolve(_response);

        });

    }

    public async PortfolioManagement1(params: any): Promise<object> {
        let _response: any = {};
    
        return new Promise(async resolve => {
            try {
                const pool = Helper.mongodbpool();
                const _mongodb = await pool.connectMongodb(process.env);
                const collection = await _mongodb.collection('tbl_scheme_mf_list');
                const data = await collection.find({ scheme_code: "124180" }).toArray();
    
                // Preprocess Data
                async function preprocessData(data: any) {
                    const features: any = [];
                    const labels: any = [];
    
                    // Assuming data is a single document
                    const feature = [
                        parseFloat(data.one_year_percent),
                        parseFloat(data.three_year_percent),
                        parseFloat(data.five_year_percent),
                        parseFloat(data.six_month_percent)
                    ];
    
                    features.push(feature);
    
                    // Assume 'risk' is the label you want to predict
                    labels.push(data.risk === 'Moderate' ? 1 : 0); // Convert 'Moderate' to 1 and others to 0
    
                    // Convert to tensors
                    const featureTensor = tf.tensor2d(features);
                    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
    
                    return { featureTensor, labelTensor };
                }
    
                // Build the Machine Learning Model
                function buildModel() {
                    const model = tf.sequential();
    
                    model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [4] }));
                    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
                    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    
                    model.compile({
                        optimizer: tf.train.adam(),
                        loss: 'binaryCrossentropy',
                        metrics: ['accuracy'] // Ensure 'accuracy' is computed during training
                    });
    
                    return model;
                }
    
                // Train the Model
                async function trainModel(model: any, featureTensor: any, labelTensor: any) {
                    await model.fit(featureTensor, labelTensor, {
                        epochs: 50,
                        batchSize: 32,
                        validationSplit: 0.2, // Ensure validation data is created
                        shuffle: true,
                        callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 5 })
                    });
                }
    
                // Evaluate and Predict
                async function main(data: any) {
                    const { featureTensor, labelTensor } = await preprocessData(data);
    
                    const model = buildModel();
                    await trainModel(model, featureTensor, labelTensor);
    
                    // Predict risk for a new scheme
                    const prediction = model.predict(tf.tensor2d([[0.67, -3.00, -7.36, 2.10]]));
    
                    // Check if prediction is an array of Tensors or a single Tensor
                    if (Array.isArray(prediction)) {
                        prediction.forEach(tensor => tensor.print());
                    } else {
                        prediction.print();
                    }
    
                    return prediction;
                }
    
                const result: any = await main(data[0]);
    
                if (result) {
                    _response = {
                        code: '000',
                        message: 'Predict',
                        result: result
                    };
                }
            } catch (err: any) {
                _response = {
                    code: '500',
                    message: 'An error occurred during validation.',
                    error: err.message
                };
                throw err;
            }
    
            resolve(_response);
        });
    }

    // public async PredictiveAnalysis(params: any): Promise<object> {
    //     let _response: any = {};
    
    //     return new Promise(async resolve => {
    //         try {
    //             const pool = Helper.mongodbpool();
    //             const _mongodb = await pool.connectMongodb(process.env);
    //             const collection = await _mongodb.collection('tbl_scheme_mf_list');
    //             const data = await collection.find({ scheme_code: "124180" }).toArray();
    
    //             // Function to normalize data for LSTM
    //             function normalizeData(data: number[]) {
    //                 const max = Math.max(...data);
    //                 const min = Math.min(...data);
    //                 return data.map(val => (val - min) / (max - min));
    //             }

    //             // Function to build and train the LSTM model
    //             async function trainLSTMModel(data: number[], lookBack: number) {
    //                 const normalizedData = normalizeData(data);
    //                 const X: number[][] = [];
    //                 const y: number[] = [];

    //                 for (let i = 0; i < normalizedData.length - lookBack; i++) {
    //                     X.push(normalizedData.slice(i, i + lookBack));
    //                     y.push(normalizedData[i + lookBack]);
    //                 }

    //                 const XTensor = tf.tensor3d(X, [X.length, lookBack, 1]);
    //                 const yTensor = tf.tensor2d(y, [y.length, 1]);

    //                 const model = tf.sequential();
    //                 model.add(tf.layers.lstm({ units: 50, returnSequences: true, inputShape: [lookBack, 1] }));
    //                 model.add(tf.layers.lstm({ units: 50 }));
    //                 model.add(tf.layers.dense({ units: 1 }));

    //                 model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

    //                 await model.fit(XTensor, yTensor, {
    //                     epochs: 100,
    //                     batchSize: 32,
    //                     verbose: 1
    //                 });

    //                 return model;
    //             }

    //             // Function to predict using the LSTM model
    //             function predictLSTM(model: tf.Sequential, data: number[], lookBack: number) {
    //                 const input = normalizeData(data).slice(-lookBack);
    //                 const inputTensor = tf.tensor3d([input], [1, lookBack, 1]);
    //                 const prediction = model.predict(inputTensor) as tf.Tensor;
    //                 const predictedValue = prediction.dataSync()[0];
    //                 return predictedValue;
    //             }

    //             // Function to train ARIMA model and make predictions
    //             function predictARIMA(data: number[], p: number, d: number, q: number) {
    //                 const arima = new ARIMA({
    //                     p: p,
    //                     d: d,
    //                     q: q,
    //                     verbose: false
    //                 }).train(data);

    //                 const [pred, errors] = arima.predict(5); // Predict next 5 values
    //                 return pred;
    //             }

    //             // Main function to run both ARIMA and LSTM predictions
    //             async function runPrediction() {
    //                 // Sample data: Replace with your actual data
    //                 const historicalPrices = [1.2, 1.3, 1.4, 1.5, 1.4, 1.6, 1.8, 1.9, 2.0, 1.9, 2.1];

    //                 // ARIMA Prediction
    //                 const arimaPredictions = predictARIMA(historicalPrices, 2, 1, 2);
    //                 console.log('ARIMA Predictions:', arimaPredictions);

    //                 // LSTM Prediction
    //                 const lstmModel = await trainLSTMModel(historicalPrices, 3);
    //                 const lstmPrediction = predictLSTM(lstmModel, historicalPrices, 3);
    //                 console.log('LSTM Prediction:', lstmPrediction);
    //             }

    //             runPrediction().catch(console.error);
    
    //             const result: any = await main(data[0]);
    
    //             if (result) {
    //                 _response = {
    //                     code: '000',
    //                     message: 'Predict',
    //                     result: result
    //                 };
    //             }
    //         } catch (err: any) {
    //             _response = {
    //                 code: '500',
    //                 message: 'An error occurred during validation.',
    //                 error: err.message
    //             };
    //             throw err;
    //         }
    
    //         resolve(_response);
    //     });
    // }
    
    public async PredictiveAnalysis(): Promise<object> {
        let _response: any = {};
    
        return new Promise(async resolve => {
            try {
                // const pool = Helper.mongodbpool();
                // const _mongodb = await pool.connectMongodb(process.env);
                // const collection = await _mongodb.collection('tbl_scheme_mf_list');
                // const data = await collection.find({ scheme_code: "124180" }).toArray();

                // Define model hyperparameters
                const timeSteps = 60;
                const numFeatures = 1;
                // const units = 50;
                // const epochs = 100;
                // const batchSize = 32;
                // const optimizer = 'adam';
                // const loss = 'meanSquaredError';


                async function fetchDataFromAPIorDB() {
                    try {
                        const apiKey = '2Z9SXUH2I9XFH19I';
                        const symbol = 'SPY';
                        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
                        
                        const response = await axios.get(url);
                        const data = response.data['Time Series (Daily)'];
                        
                        // Check if the data is undefined or null
                        if (!data) {
                            throw new Error('Time Series (Daily) data not found in the response');
                        }
                
                        // Convert the data into an array of closing prices
                        const historicalPriceData = Object.keys(data).map(date => parseFloat(data[date]['4. close']));
                        
                        return historicalPriceData.reverse(); // Reverse to have the oldest date first
                
                    } catch (error: any) {
                        console.error('Error fetching data:', error.message);
                        return [];
                    }
                }
                
    
                const createModel = () => {
                    const model = tf.sequential();
                
                    model.add(tf.layers.lstm({
                        units: 50,
                        returnSequences: true,
                        inputShape: [timeSteps, numFeatures]
                    }));

                    model.add(tf.layers.lstm({
                        units: 50,
                        returnSequences: false
                    }));

                    model.add(tf.layers.dense({
                        units: 1
                    }));
                
                    model.compile({
                        optimizer: 'adam',
                        loss: 'meanSquaredError'
                    });
                
                    return model;
                };

                const prepareTestData = (data: any, timeSteps: any) => {
                    const X_test = [];
                
                    // Loop through the data to create the test sequences
                    for (let i = timeSteps; i < data.length; i++) {
                        // Slice the data from (i - timeSteps) to i and push it to X_test
                        X_test.push(data.slice(i - timeSteps, i));
                    }
                
                    // Convert X_test to a 3D tensor
                    return tf.tensor3d(X_test, [X_test.length, timeSteps, 1]);  // Assuming 1 feature (price)
                };

                const prepareData = (data: any, timeSteps: any) => {
                    const X = [];
                    const y = [];
                
                    for (let i = timeSteps; i < data.length; i++) {
                        X.push(data.slice(i - timeSteps, i));
                        y.push(data[i]);
                    }
                
                    return {
                        X: tf.tensor3d(X),
                        y: tf.tensor2d(y, [y.length, 1])
                    };
                };

                const trainModel = async (model: any, X_train: any, y_train: any, epochs = 100) => {
                    return await model.fit(X_train, y_train, {
                        epochs: epochs,
                        batchSize: 32,
                        validationSplit: 0.2
                    });
                };

                const predict = (model: any, X_test: any) => {
                    return model.predict(X_test);
                };

                const historicalPriceData = await fetchDataFromAPIorDB();

                const model = createModel();
                const { X, y } = prepareData(historicalPriceData, 60);
                
                // const { X_train, y_train } = prepareData(historicalPriceData, timeSteps);
                const X_test = prepareTestData(historicalPriceData, 60);

                trainModel(model, X, y).then(() => {
                    const predictions = predict(model, X_test);
                    console.log(predictions);
                });
    
                // const result: any = await main(data[0]);
    
                // if (result) {
                //     _response = {
                //         code: '000',
                //         message: 'Predict',
                //         result: result
                //     };
                // }

            } catch (err: any) {
                _response = {
                    code: '500',
                    message: 'An error occurred during validation.',
                    error: err.message
                };
                throw err;
            }
    
            resolve(_response);
        });
    }

    public async RiskManagement(params: any): Promise<object> {
        let _response: any = {};
    
        return new Promise(async resolve => {
            try {
                const pool = Helper.mongodbpool();
                const _mongodb = await pool.connectMongodb(process.env);
                const collection = await _mongodb.collection('tbl_scheme_mf_list');
                const data = await collection.find({ scheme_code: "124180" }).toArray();
    
                // [NAV, market_conditions, historical_performance, volatility, interest_rates, economic_indicators, fund_type]

                // Example of preprocessing data
                const historicalData = tf.tensor2d([
                    // [NAV, market_condition, historical_performance]
                    [120, 0.5, 0.7],
                    [130, 0.6, 0.8],
                    [125, 0.4, 0.75],
                    // Add more historical data here
                ]);

                // Define a simple model
                const model = tf.sequential();
                model.add(tf.layers.dense({ units: 32, inputShape: [3], activation: 'relu' }));
                model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
                model.add(tf.layers.dense({ units: 1 })); // Output risk score

                model.compile({
                    optimizer: tf.train.adam(),
                    loss: 'meanSquaredError',
                });

                // Training the model (placeholder data for example)
                const riskScores = tf.tensor2d([
                    [0.2], // Corresponding risk score for the first row in historicalData
                    [0.3], // Corresponding risk score for the second row in historicalData
                    [0.25], // Corresponding risk score for the third row in historicalData
                    // Add more target risk scores here
                ]);

                model.fit(historicalData, riskScores, {
                    epochs: 50,
                    callbacks: {
                        onEpochEnd: (epoch: any, logs: any) => {
                            console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
                        }
                    }
                });

                // Predicting the risk for new data
                const newData = tf.tensor2d([[128, 0.55, 0.77]]);
                model.predict(newData).print();

                // Simulate market stress conditions
                const stressTestScenarios = tf.tensor2d([
                    [128, 0.9, 0.6], // High market volatility scenario
                    [130, 0.7, 0.8], // Moderate market volatility scenario
                    [125, 0.3, 0.9], // Low market volatility scenario
                ]);

                // Predicting under stress conditions
                const stressTestResults = model.predict(stressTestScenarios);
                stressTestResults.print();
                    
                // const result: any = await main(data[0]);
    
                // if (result) {
                //     _response = {
                //         code: '000',
                //         message: 'Predict',
                //         result: result
                //     };
                // }
            } catch (err: any) {
                _response = {
                    code: '500',
                    message: 'An error occurred during validation.',
                    error: err.message
                };
                throw err;
            }
    
            resolve(_response);
        });
    }

}

export default IntegrationService
