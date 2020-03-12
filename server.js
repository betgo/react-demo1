const Koa = require('koa');
const next = require('next')
const Router = require('koa-router')

const KoaBody = require('koa-body')
const session = require('koa-session')
const Redis = require('ioredis')
const RedisSessionStore = require('./server/redisSession')

const auth = require('./server/auth')
const Api = require('./server/api')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const redis  = new Redis(6379,'192.168.1.111')

app.prepare().then(()=>{
  const server = new Koa();
  const router = new Router()

  server.keys = ['Github app']

  server.use(KoaBody())

  const SESSION_CONFIG = {
    key:'jid',
    store:new RedisSessionStore(redis)
  }


  server.use(session(SESSION_CONFIG,server))
  auth(server)
  Api(server)

  router.get('/a/:id',async ctx=>{
    const id = ctx.params.id
    await handle(ctx.req,ctx.res,{
      pathname:'/a',
      query:{id},
    })
    ctx.respond = false
  })

  router.get('/api/user/info',async ctx =>{
    const user = ctx.session.userInfo
    if(!user){
      ctx.status = 401
      ctx.body = 'Need login'
    }
    else{
      ctx.body = user
      ctx.set('Content-Type','application/json')
    }
  })

  server.use(router.routes())


  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'userid:xxxxx')
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx,next)=>{
    console.log(2)
    console.log(ctx.req.url,"---time",new Date().toUTCString);
     await next()
    console.log(ctx.res.statusCode,"-----time",new Date().toUTCString)
    
  })
  server.use(async (ctx,next)=>{
    console.log(3)
    ctx.res.statusCode = 200
    await next()
  })

  server.listen(3000,()=>{
    console.log('3000启用')
}
)
  
})




