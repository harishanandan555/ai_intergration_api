'use strict';

const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { DataTypes } = require('sequelize');
const path = require('path');

let model_list: any = {};

let _mongooseConnect: any = null;
let _mongodbConnect: any = null;

export default class MongodbPool {

  constructor(environment: any) {
    this.initializeConnections(environment);
  }

  private async initializeConnections(environment: any) {
    try {
      if (!_mongooseConnect) {
        console.log('Connecting to Mongoose...');
        await this._connectMongoose(environment);
        await this.loadModels(environment);
      }

      if (!_mongodbConnect) {
        console.log('Connecting to MongoDB...');
        await this._connectMongodb(environment);
      }
    } catch (error) {
      console.error('Error initializing connections:', error);
      throw error;
    }
  }

  private async _connectMongoose(environment: any) {
    try {
      _mongooseConnect = await mongoose.connect(environment.BULLBOX_CONNECT_SRV_URI);
      console.log('Mongoose connected.');
    } catch (error) {
      console.error('Error connecting to Mongoose:', error);
      throw error;
    }
  }

  private async _connectMongodb(environment: any) {
    try {
      const client = new mongodb.MongoClient(environment.BULLBOX_CONNECT_SRV_URI, {
        // Removed deprecated options
      });
      await client.connect();
      _mongodbConnect = client.db(environment.BULLBOX_CONNECT_DB_NAME);
      console.log('MongoDB connected.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  private async loadModels(environment: any) {
    try {
      const _model_name_list = JSON.parse(environment.ARR_MODEL_NAME_LIST);
      _model_name_list.forEach((model_name: string) => {
        model_list[model_name] = require(path.join(__dirname, '..', 'models', model_name))(_mongooseConnect, DataTypes);
      });
    } catch (error) {
      console.error('Error loading models:', error);
      throw error;
    }
  }

  connectMongoose = async (environment: any) => {
    try {
      if (!_mongooseConnect) {
        _mongooseConnect = await mongoose.connect(environment.BULLBOX_CONNECT_SRV_URI, {
          // Removed deprecated options
        });
        console.log('Initial Mongoose connection established.');
      }
      return _mongooseConnect;
    } catch (error) {
      console.error('Error connecting to Mongoose:', error);
      throw error;
    }
  }

  connectMongodb = async (environment: any) => {
    try {
      if (!_mongodbConnect) {
        const client = new mongodb.MongoClient(environment.BULLBOX_CONNECT_SRV_URI);
        await client.connect();
        _mongodbConnect = client.db(environment.BULLBOX_CONNECT_DB_NAME);
        console.log('Initial MongoDB connection established.');
      }
      return _mongodbConnect;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  public async getModels(model_name: string, environment: any) {
    try {
      if (Object.keys(model_list).length === 0) {
        await this.loadModels(environment);
      }
      return model_list[model_name];
    } catch (error) {
      console.error('Error getting models:', error);
      throw error;
    }
  }

}

// export default class MongodbPool {

//   constructor(environment: any) {

//     if(!_mongooseConnect) {
//       (async () => {
//         console.log('connecting mongoose...');
//         await _connectMongoose();

//         this.loadModels(environment)

//       })()
//     }

//     if(!_mongodbConnect) 
//     {
//       (async () => {

//         console.log('connecting mongodb...');
//         await _connectMongodb();

//       })()
//     }      

//     async function _connectMongoose() {
      
//       _mongooseConnect = await mongoose.connect(environment.BULLBOX_CONNECT_SRV_URI);
//       console.log(`Mongoose Connected: `); 

//     } 

//     async function _connectMongodb() {

//       const _mongodb = await new mongodb.MongoClient(environment.BULLBOX_CONNECT_SRV_URI).connect();
//       _mongodbConnect = _mongodb.db(environment.BULLBOX_CONNECT_DB_NAME)
      
//       console.log(`Mongodb Connected: `);

//       return true;

//     }

//   }

//   async loadModels(environment: any) {
//     try {        

//       const _model_name_list = JSON.parse(environment.arr_model_name_list);

//       _model_name_list.forEach(function(model_name: string) {
//         model_list[model_name] = require(path.join(__dirname, '..', 'models', 
//           model_name/*.replace(new RegExp("'", 'g'), '')*/))(_mongooseConnect) 
//       });

//     } catch (error) {
//       throw error;
//     }
//   }

//   connectMongoose = async (environment: any) => {
//     if(!_mongooseConnect) {
//       try {
        
//         _mongooseConnect = await mongoose.connect(environment.BULLBOX_CONNECT_SRV_URI, { useNewUrlParser: true });
//         console.log(`Mongoose Connected: `);
        
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     return _mongooseConnect;
//   }

//   connectMongodb = async (environment: any) => {
//     try {
//       const _mongodb = await new mongodb.MongoClient(environment.BULLBOX_CONNECT_SRV_URI).connect();
//       _mongooseConnect = await _mongodb.db(environment.BULLBOX_CONNECT_DB_NAME)
//       // _mongooseConnect = await _mongooseConnect.collections();
//       console.log(`Mongodb Connected: `);
//       return _mongooseConnect;
//     } 
//     catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//       throw error;
//     }
//   }

//   async getModels(modal_name: string, environment: any) {

//     if (Object.keys(model_list).length === 0) {

//       const _model_name_list = JSON.parse(environment.arr_model_name_list);

//       _model_name_list.forEach(function(model_name: string) {
//         model_list[model_name] = require(path.join(__dirname, '..', 'models', model_name)) (_mongooseConnect, DataTypes) 
//       });

//     }

//     return model_list[modal_name];    

//   }

// }