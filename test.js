const axios = require('axios-https-proxy-fix')
const Koa = require('koa');
const request = require('request')

const app = new Koa()
console.log(1)
app.use(async (ctx,next)=>{
    console.log(1)
        await axios({
    method:'GET',
    url:`https://www.baidu.com/`,
    proxy: { host: '127.0.0.1', port: 8888 },
})
    console.log(2)
})

axios({
    method:'GET',
    url:`https://www.baidu.com/`,
    proxy: { host: '127.0.0.1', port: 10809 },

}).then(res=>console.log('ssss',res))

app.listen(3000,()=>{
    console.log('3000启用')
}
)


