const jwt = require('njwt');

import events from '../events';
import Helper from '../pool/helper';
import * as config from '../config';
import { Master } from '../properties';
import PGPool from '../pool/pg';
import {logger} from '../shared/Logger';
import { TokenBody } from '../typings/interface';
import { randomString } from '../helpers';
import messages from '../constants';

export class MasterService {

  expReq?: any
  expRes?: any

  public async getSebiAdviserList(params: Master): Promise<object> {
    
    let _response : any;
    
    return new Promise(async resolve => {
      
      try {

          const pool = Helper.mongodbpool()
          
          const _model = await pool.getModels('master', process.env)
          _response = await _model.sebiadviserModel.find({ is_cancelled: false });
          
          resolve (_response);

      } catch (err: any) {
          resolve(err)
      }
      finally { }

    });

  }
}

export default MasterService
