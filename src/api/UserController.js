import SignRecord from "../model/SignRecord";
import {getJWTPayload} from "../common/utils";
import User from '../model/User'
import moment from "moment";

class UserController {
  constructor() {
  }

  // 用户签到接口
  async userSign(ctx) {
    // 取用户的ID
    const obj = await getJWTPayload(ctx.header.authorization)
    // 查询用户上一次签到记录
    const record = await SignRecord.findByUid(obj._id)
    let newRecord,result;
    // 判断签到逻辑
    if (record !== null) {
      // 有历史的签到数据

    } else {
      // 无签到数据,初次签到
      // 保存用户的签到数据,签到计数 + 积分数据
      await User.updateOne({
        _id: obj._id
      }, {
        $set: {count: 1},
        $inc: {favs: 5} // 积分数加5
      })
      // 保存用户签到记录
      newRecord = new SignRecord({uid: obj._id, favs: 5, last_sign: moment().format('YYYY-MM-DD HH:mm:ss')})
      await newRecord.save()
      result = {
        favs: 5,
        count: 1
      }
    }

    ctx.body = {
      code: 200,
      msg: '请求成功',
      ...result
    }
  }
}

export default new UserController()
