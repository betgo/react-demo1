import { useEffect } from 'react'

import axios from 'axios'

import { connect } from 'react-redux'
import getCofnig from 'next/config'
import Router, { withRouter } from 'next/router'
import { Button, Tabs } from 'antd'
import {MailOutlined} from '@ant-design/icons';
import LRU from 'lru-cache'

import Repo from '../components/Repo';

const { publicRuntimeConfig } = getCofnig()

const cache = new LRU({
  maxAge:1000*10
})

const api = require('../lib/api')


let cachedUserRepos,cachedUserStaredRepos

const isServer = typeof window ==='undefined'
function Index({userRepos,userStaredRepos,user,router}){

  const tabKey = router.query.key || '1'
  
  useEffect(()=>{
    if(!isServer){
      cachedUserRepos = userRepos
      cachedUserStaredRepos =userStaredRepos

      const timeout = setTimeout(()=>{
        cachedUserRepos = null
        cachedUserStaredRepos =null
      },1000*10)
    }
  },[userRepos,userStaredRepos])
  
  const handleTabChange = activeKey =>{
    Router.push(`/?key=${activeKey}`)
  }
  if(!user || !user.id){
    return (
      <div className="root">
        <p>亲，你还没登录</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          请点击登录
        </Button>
        <style jsx>{`
            .root{
              height:400px;
              display:flex;
              flex-direction:column;
              justify-content:center;
              align-items:center;
            }
          `}</style>
      </div>
    
    )
  }


  return(
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt = "user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
        <MailOutlined style={{ marginRight:10}}/>
        <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>

    <div className="user-props">
        <div className="user-repos">
          {/* {
            userRepos.map((item)=>(<Repo repo={item} />))
          } */}
          <Tabs defaultActiveKey={tabKey} onChange={handleTabChange} animated={false}>
            <Tabs.TabPane tab="你的仓库" key="1">
              {
               userRepos.map((item)=>(<Repo repo={item} key={item.id} />))
              }
              
            </Tabs.TabPane>
            <Tabs.TabPane tab="你关注的仓库" key="2">
              {
                userStaredRepos.map((item)=>(<Repo repo={item} key={item.id} />))
              }
            </Tabs.TabPane>
          </Tabs>
        </div>
       </div>
    <style jsx>{`
        .root{
          display:flex;
          align-items:flex-start;
          padding:20px 0;

        }
        .user-info{
          width:200px;
          margin-right:40px;
          flex-shrink:0;
          display:flex;
          flex-direction:column;
        }
        .login{
          font-weight:800;
          font-size:20px;
          margin-top:20px;
        }
        .name{
          font-weight:16px;
          color:#777;
        }
        .bio{
          margin-top:20px;
          color:#333;
        }
        .avatar{
         width:100%;
         border-radius:5px;
        }
        .user-props{
          flex:1;
        }
    `}</style>
    </div>
  )
}

Index.getInitialProps = async ({ctx,reduxStore})=>{
  
  const user  = reduxStore.getState().user
  if(!user || !user.id){
    return{
      isLogin:false
    }
  }
  if(!isServer){
     if(cachedUserRepos && cachedUserStaredRepos){
    return{
      userRepos:cachedUserRepos,
      userStaredRepos:cachedUserStaredRepos
    }
    }
  }
 
  
  const userRepos = await api.request({
    url:'/user/repos',
  },
  ctx.req,
  ctx.res
  )

  const userStaredRepos = await api.request({
    url:'/user/starred',
  },
    ctx.req,
    ctx.res
  )

  return{
    isLogin:true,
    userRepos:userRepos.data,
    userStaredRepos:userStaredRepos.data
  }
}

export default withRouter(
  connect(function mapState(state){
    return {
      user:state.user
    }
  })(Index)
)