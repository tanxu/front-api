import send from '../config/MailConfig'
import moment from "moment";
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import {checkCode} from "../common/utils";
import UserModel from "../model/User";

class LoginController {
  constructor() {
  }

  async forget(ctx) {
    const {body} = ctx.request
    try {
      // 查数据库，body.username, user也是从数据库查的
      const result = await send({
        code: '1234',
        expire: moment().add('30', 'm').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Brain'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }

  }

  async login(ctx) {
    // 1. 接收用户的数据
    const {body} = ctx.request
    const sid = body.sid
    const code = body.code
    const username = body.username
    // 2. 验证图片验证码的时效性，正确性
    if(await checkCode(sid, code)){
      console.log('check ok')

      // 3. 验证用户账号密码是否正确
      let checkUserPasspwd = null
      const user = await UserModel.findOne({username})
      if(user.password === body.password){
        checkUserPasspwd=true
      }
      if(checkUserPasspwd){
        // 4. 返回token
        // const token = jsonwebtoken.sign({
        //   _id: 'brain',
        //   exp: Math.floor((Date.now() / 1000) + 60 * 60 * 24) // 一天
        // }, config.JWT_SECRET)
        const token = jsonwebtoken.sign({
          _id: 'brain'
        }, config.JWT_SECRET, {
          expiresIn: '1d' // 一天
        })
        ctx.body = {
          code: 200,
          token: token,
          msg: '登录成功'
        }
      }else{
        // 用户名，密码验证失败
        ctx.body = {
          code: 404,
          msg: '用户名或密码错误！'
        }
      }

    }else{
      ctx.body = {
        code: 401,
        msg: '图片验证码校验失败！'
      }
    }


  }
}

export default new LoginController()
