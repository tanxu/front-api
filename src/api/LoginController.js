import send from '../config/MailConfig'
import moment from "moment";

class LoginController{
  constructor() {
  }
  async forget(ctx){
    const { body } = ctx.request
    try{
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
    }catch (e){
      console.log(e)
    }

  }
}

export default new LoginController()
