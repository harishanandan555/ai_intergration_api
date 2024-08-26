import { NullableBoolean, NullableNumber, NullableString } from '../typings/types'

export class Master {
  
  public salt: NullableString = undefined

  public hashpass: NullableString = undefined

  public id_role: NullableNumber = undefined

  public role_name: NullableString = undefined

  public is_admin: NullableBoolean = undefined

}

export default Master
