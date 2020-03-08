const Redis = require('ioredis')

const redis = new Redis(6379,'192.168.1.5')

redis.set('aa',232)
redis.get('aa',(err,result)=>{
    console.log(result)
})

redis.get('aa').then((res)=>{
    console.log(res)
})