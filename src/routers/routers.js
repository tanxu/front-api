import combineRouters from 'koa-combine-routers'

import publickRouter from './publickRouter'
import loginRouter from './loginRouter'
import userRouter from './userRouter'

// 路由合并插件
export default combineRouters(publickRouter, loginRouter, userRouter)
