const axios = require('axios')
const Router = require('koa-router')

const { requestGithub } = require('../lib/api')

const github_base_url = 'https://api.github.com'

module.exports = server => {
    server.use(async (ctx, next) => {
        const path = ctx.path
        const method = ctx.method
     
        if (path.startsWith('/github/')) {

            console.log('path',path)
            console.log(ctx.request.body);
            const session = ctx.seesion
            const githubAuth = session && seesion.githubAuth
            const headers = {}

            if (githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
            }
            const result = await requestGithub(
                method,
                ctx.url.replace('/github/', '/'),
                ctx.request.body || {},
                headers,
            )
            ctx.status = result.status
            ctx.body = result.data


        }  else{
            await next()
        }
    })
}