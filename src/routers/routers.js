import combineRouters from 'koa-combine-routers'
import demoRouter from './demoRouter'
import publickRouter from './publickRouter'

// 路由合并插件
export default combineRouters(demoRouter,publickRouter)