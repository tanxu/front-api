class DemoController{
  constructor() {
  }
  async demo(ctx){
    ctx.body = {
      msg: 'demo message router'
    }
  }
}

export default new DemoController()