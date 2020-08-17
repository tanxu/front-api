import combineRouters from 'koa-combine-routers'

import publickRouter from './publickRouter'
import loginRouter from './loginRouter'

// 路由合并插件
export default combineRouters(publickRouter, loginRouter)
