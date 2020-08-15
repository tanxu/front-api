import combineRouters from 'koa-combine-routers'
import demoRouter from './demoRouter'

// 路由合并插件
export default combineRouters(demoRouter)