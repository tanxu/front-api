import mongoose from '../config/DBHelper'
import moment from "moment";

const Schema = mongoose.Schema

const SignRecordSchema = new Schema({
  uid: {type: String, ref: 'users'},
  create_time: {type: Date},
  favs: {type: Number},
  last_sign: {type: Date}
})

SignRecordSchema.pre('save', function (next) {
  console.log('SignRecordSchema saved')
  this.create_time = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

SignRecordSchema.statics = {
  findByUid: function (uid) {
    return this.findOne({uid}).sort({create_time: -1})
  }
}

const SignRecord = mongoose.model('sign_record', SignRecordSchema)

export default SignRecord
