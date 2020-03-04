const Koa = require('koa');
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

const server = new Koa();
const router = new Router()

router.get('/test',(ctx,next)=>{
      ctx.body = '<span>KOA </span>'
})

server.use(async (ctx,next)=>{

  await next()
})
server.use(router.routes())


server.listen(3000,()=>{
    console.log('3000启用')
})