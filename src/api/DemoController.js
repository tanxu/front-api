class DemoController {
  constructor() {
  }

  async demo(ctx) {
    ctx.body = {
      code: 200,
      data: 'xxx',
      msg: 'demo message router'
    }
  }
}

export default new DemoController()
