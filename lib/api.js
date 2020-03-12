const axios = require('axios-https-proxy-fix')
// let httpsProxyAgent = require('https-proxy-agent');

const github_base_url = 'https://api.github.com'
async function requestGithub(method,url,data,headers){
    // var agent =new httpsProxyAgent('http://127.0.0.1:8888')
    console.log('method',method)
    console.log('url',url)
    console.log('data',data)
    console.log('headers',headers)
    return await axios({
        method,
        url:`${github_base_url}${url}`,
        proxy: { host: '127.0.0.1', port: 10808 },
        data,
        headers
    })
}


const isServer = typeof window === 'undefined'

async function request({ method = 'GET', url, data = {}, headers }, req, res) {
    console.log('api query ',url);
    console.log('time:',new Date().toISOString())
    if(!url){
        throw Error('url must provide')
    }
    if(isServer){
        const session = req.session
        const githubAuth = session.githubAuth || {}
        const headers = {}
        if(githubAuth.access_token){
            headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
        }
        return await requestGithub(method,url,data,headers)
    }else{
        return await axios({
            method,
            url:`/github${url}`,
            data,
        })
    }

}

module.exports = {
    request,
    requestGithub,
}
