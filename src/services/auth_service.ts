import mongoose from 'mongoose';

import events from '../events';
import Helper from '../pool/helper';
import * as config from '../config';
import { Auth } from '../properties/auth';
import {logger} from '../shared/Logger';
import { TokenBody } from '../typings/interface';
import { randomString } from '../helpers';
import messages from '../constants';


export class AuthService {
  
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
}

export default AuthService
