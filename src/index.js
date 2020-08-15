// const Koa = require('koa')
// const path = require('path')
import Koa from 'koa'
import path from 'path'
import compress from 'koa-compress'
// const helmet = require('koa-helmet')
// const statics = require('koa-static')
import helmet from 'koa-helmet'
import statics from 'koa-static'
import koaBody from 'koa-body'
import koaJson from 'koa-json'
import cors from '@koa/cors'
import compose from "koa-compose";

const app = new Koa()

const isDevMode = (process.env.NODE_ENV === 'production' ? false : true)

// const router = require('./routers/routers')
import router from './routers/routers'


// app.use(helmet())
// app.use(statics(path.join(__dirname, '../public')))
// app.use(router())

// 使用koacompose整合中间件
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  koaJson({pretty: false, param: 'pretty'}),
  helmet()
])

if(!isDevMode){
  // 压缩
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3000)