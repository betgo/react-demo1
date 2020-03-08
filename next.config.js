const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const withBundleAnalyzeer = require('@zeit/next-bundle-analyzer')
const config = require('./config.sample')
const configs = {
    disDir:'dest',
    generateEtags:true,
    onDemandEntries:{
        maxInactiveAge:25*1000,
        pagesBufferLength:2,
    },
    pageExtensions:['jsx','js'],
    generateBuildId:async ()=>{
        if(process.env.YOUR_BUILD_ID){
            return process.env.YOUR_BUILD_ID
        }
        return null
    },

    webpack(config,options){
        return config
    },
    env:{
        customKey:'value',
    },
    serverRuntimeConfig:{
        mySecret:'secret',
        secondSecret:process.env.SECOND_SECRET,
    },
    publicRuntimeConfig:{
        staticFolder:'/static',
    },
}

    if(typeof require !=='undefined'){
        require.extensions['.css']  =file =>{}
    }

 module.exports =withCss({
    publicRuntimeConfig:{
                    GITHUB_OAUTH_URL:config.GITHUB_OAUTH_URL,
                    OAUTH_URL:config.OAUTH_URL
                },

 })

 //withBundleAnalyzeer(
//     withCss({
//         webpack(config){
//             config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/))
//             return config
//         },
//         publicRuntimeCinfig:{
//             GITHUB_OAUTH_URL:config.GITHUB_OAUTH_URL,
//             OAUTH_URL:config.OAUTH_URL
//         },
//         analyzeBrower:['browser','both'].includes(process.env.BUNDLE_ANALYSE),
//         bundleAnalyzerConfig:{
//             server:{
//                 analyzerMode:'static',
//                 reportFilename:'../bundles/server.html;,'
//             },
//             browser:{
//                 analyzerMode:'static',
//                 reportFilename:'../bundles/client.html;,'
//             }
//         }
//     })
// )