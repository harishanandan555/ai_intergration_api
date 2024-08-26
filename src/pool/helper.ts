
import PGPool from './pg'
import MongodbPool from './mongodb'
export { CUserAuthInfoRequest } from '../typings/interface'

export class Helper {

  public static pool() {
    return new PGPool(process.env.NODE_ENV)
  }

  public static mongodbpool() {
    return new MongodbPool(process.env)
  }

}

export default Helper
