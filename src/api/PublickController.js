import svgCaptcha from 'svg-captcha'

class PublickController{
  constructor() {
  }
  async getCapthca(ctx){
    const captcha = svgCaptcha.create({
      width: 150,
      height:38,
      ignoreChars: '0o1li',
      color: true,
      noise: Math.floor(Math.random()*5)
    });
    ctx.body = {
      code: 200,
      data: captcha.data
    }
  }
}

export default new PublickController()