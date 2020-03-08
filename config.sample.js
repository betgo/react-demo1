const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE ='user'
const client_id = '5cea3ac6572fbc09a552'
module.exports = {
    github:{
        client_id,
        ClientSecret:'4f600cf0b451e91dc35bf6753ef808b17385a3bf',
        request_token_url:'https://github.com/login/oauth/access_token'
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}