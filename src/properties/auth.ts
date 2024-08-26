
import Helper from '../pool/helper'
import { NullableBoolean, NullableNumber, NullableString } from '../typings/types'

export class Auth {
  
  public name: NullableString = undefined

  public auth_first_name: NullableString = undefined

  public auth_last_name: NullableString = undefined

  public auth_email: NullableString = undefined
  
  public username: NullableString = undefined

  public salt: NullableString = undefined

  public hashpass: NullableString = undefined

  public id_role: NullableNumber = undefined

  public role_name: NullableString = undefined

  public is_admin: NullableBoolean = undefined

  // constructor(model?: any) {
  //   super()
  //   if (model) {
  //     Helper.shallowCopy(model, this)
  //   }
  // }
}

export default Auth
