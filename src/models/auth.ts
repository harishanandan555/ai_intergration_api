
import mongoose, { Document, Model, Schema } from 'mongoose';

module.exports = function(_mongoose: any) {

  interface Auth {
      name: string;
      mode: string;
      created_date: Date
  }

  const authSchema = new Schema({
      name: String,
      mode: String,
      created_date: Date
  }, { collection: 'tbl_auth' });

  const connectSchema = new Schema({
      name: String,
      mode: String,
      created_date: Date
  }, { collection: 'tbl_connect' });

  var _models = {
    authModel: _mongoose.model("authModel", authSchema),
    connectModel: _mongoose.model('connectModel', connectSchema)
  };

  return _models

}