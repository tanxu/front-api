import svgCaptcha from 'svg-captcha'
import {getValue, setValue} from "../config/RedisConfig";

class PublickController{
  constructor() {
  }
  async getCapthca(ctx){
    const sid = ctx.request.query.sid
    const captcha = svgCaptcha.create({
      width: 150,
      height:38,
      ignoreChars: '0o1li',
      color: true,
      noise: Math.floor(Math.random()*5)
    });
    // 图片验证码的时效为10分钟
    setValue(sid, captcha.text, 10 * 60)
    ctx.body = {
      code: 200,
      data: captcha.data
    }
  }
}

export default new PublickController()
