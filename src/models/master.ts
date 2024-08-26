
import mongoose, { Document, Model, Schema } from 'mongoose';

module.exports = function(_mongoose: any) {

  interface Master {
      name: string;
      mode: string;
      created_date: Date
  }

  const sebiadviserSchema = new Schema({
      name: String,
      mode: String,
      created_date: Date
  }, { collection: 'sebiadviser_master_list' });

  const testSchema = new Schema({
      name: String,
      mode: String,
      created_date: Date
  }, { collection: 'tbl_test' });

  var _models = {
    sebiadviserModel: _mongoose.model("sebiadviserModel", sebiadviserSchema),
    testModel: _mongoose.model('testModel', testSchema)
  };

  return _models

}