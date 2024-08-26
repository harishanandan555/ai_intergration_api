'use strict'

import pg from 'pg'
const config = require('../config/settings');

const types = pg.types
const timestamp_OID = 1114

const parseDates = (val: string) => new Date(Date.parse(val + '+0000'))
types.setTypeParser(timestamp_OID, parseDates)

interface Callback {
  (err: null | Error, res?: pg.QueryResult): void | Error | pg.QueryResult
}

let pool: pg.Pool

export default class PGPool {

  constructor(environment: any) {

    if(!pool)
       pool = new pg.Pool(config[`pg_connection_string`][environment])

    pool.on('error', function (err: Error, _client: any) {
      console.log(`Idle-Client Error:\n${err.message}\n${err.stack}`)
    })

  }

  public static pool(environment: any) {
    if(!pool)
       pool = new pg.Pool(config[`pg_connection_string`][environment] /*dbConfig*/)
    return pool
  }

  query(cUser: any, sqlText: string, params: any[] = [], callback: Callback) {
    if (!cUser) {
      return callback(new Error('Database user not defined.'))
    }
    pool.connect(function (err: any, client: any, done: any) {
      if (err) {
        return callback(err)
      }
      client.query(`SET SESSION postgres.username = '${cUser.username}'`, [], function (err: Error) {
        if (err) {
          done()
          return callback(err)
        } else {
          client.query(sqlText, params, function (_err: Error, res: any) {
            done()
            if (_err) {
              return callback(_err)
            }
            return callback(null, res)
          })
        }
      })
    })
  }

  async aquery(cUser: any, sqlText: string, params: any[] = []): Promise<pg.QueryResult<any>> {
    const client = await pool.connect()
    try {
      await client.query(`SET SESSION postgres.username = '${cUser.username}'`, [])
      const result = await client.query(sqlText, params)

      return result
    } catch (e) {
      throw e
    } finally {
      client.release()
    }
  }
  
  async executeQuery(sqlText: string, params: any[] = []): Promise<pg.QueryResult<any>> {

    const client = await pool.connect()

    try {
      const result = await client.query(sqlText, params)

      return result;

    } catch (e) {
      throw e
    } 
    finally {
      client.release()
    }
    
  }

  async connect(): Promise<pg.PoolClient> {
    const client = await pool.connect()
    return client
  }

}
