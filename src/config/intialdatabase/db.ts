import "reflect-metadata";
import { Pool } from 'pg';
import {logger} from '../../shared/Logger';

const config = require('../settings');    

let _ibcdb_pool: any ;

export async function intializeDB(environment: any): Promise<string> {

  return new Promise<string>( async resolve => {

    try {

      _ibcdb_pool = new Pool(config[`pg_connection_string`][environment])
      const client = await _ibcdb_pool.connect()
      await client.query('SELECT NOW()')
      client.release();
      resolve("success");
      logger.info('Database successfully initialized');

    }
    catch(error: any) {
      resolve(error.message)
    }

  });
}

export async function getDB(environment: any): Promise<void> {

  if(!_ibcdb_pool) {
    _ibcdb_pool = new Pool(config[`pg_connection_string`][environment])
    const client = await _ibcdb_pool.connect()
    await client.query('SELECT NOW()')
    client.release();
  }
  else
      return _ibcdb_pool;

  logger.info('Database connection sent');

}
