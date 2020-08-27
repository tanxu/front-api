import moment from "moment";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

import send from '../config/MailConfig'
import config from '../config'
import {checkCode} from "../common/utils";
import UserModel from "../model/User";

// import { PassHandle } from "../common/crypto";

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
    const password = body.password
    // 2. 验证图片验证码的时效性，正确性
    const result = await checkCode(sid, code)
    if (result) {
      // 3. 验证用户账号密码是否正确
      let checkUserPasspwd = null
      const user = await UserModel.findOne({username})
      // 对比密码
      const comparePassword = await bcrypt.compare(password, user.password)
      // 如果密码输入正确
      if (comparePassword) checkUserPasspwd = true
      if (checkUserPasspwd) {
        // 4. 返回token
        const userObj = user.toJSON()
        const arr = ['password', 'username', 'roles']
        arr.map(item=>{
          delete userObj[item]
        })
        const token = jsonwebtoken.sign({
          _id: 'brain'
        }, config.JWT_SECRET, {
          expiresIn: '1d' // 一天
        })
        ctx.body = {
          code: 200,
          token: token,
          data: userObj,
          msg: '登录成功'
        }
      } else {
        // 用户名，密码验证失败
        ctx.body = {
          code: 500,
          msg: '用户名或密码错误！'
        }
      }

    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码校验失败！'
      }
    }


  }


  async reg(ctx) {
    // 1. 接收客户端的参数
    const {body} = ctx.request
    // 2. 校验验证码的内容， 时效性 有效性
    const sid = body.sid
    const code = body.code
    const username = body.username
    const nickname = body.nickname
    const password = body.password
    const enpassword = await bcrypt.hash(password, 5)
    let msg = {}
    // 2. 验证图片验证码的时效性，正确性
    const result = await checkCode(sid, code)
    let check = true
    if (result) {
      // 3. 查库， username是否被注册
      let user1 = await UserModel.findOne({username: username})
      if (user1 && typeof user1.username !== 'undefined') {
        msg.username = ['此邮箱已经被注册，可以通过邮箱找回密码！']
        check = false
      }
      // 4. 查库， nickname是否被注册
      let user2 = await UserModel.findOne({nickname: nickname})
      if (user2 && typeof user2.username !== 'undefined') {
        msg.username = ['此昵称已经被注册，请修改！']
        check = false
      }
      if (check) {
        // 5. 写入数据到数据库
        let user = new UserModel({
          username: username,
          nickname: nickname,
          password: enpassword
        })
        const result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
      }
    } else {
      // validate 显示的错误
      msg.vercode = ['验证码已经失效，请重新获取！']
      ctx.body = {
        code: 401,
        msg: msg
      }
    }

  }
}

export default new LoginController()
