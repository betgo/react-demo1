
import { Button ,Layout,Input,Avatar, Dropdown, Tooltip, Menu,} from 'antd'
import {GithubOutlined,UserOutlined}  from '@ant-design/icons';
import Link from 'next/link';
import {useState, useCallback} from 'react';

import Container from './container';

import {withRouter} from 'next/router'
import {connect} from 'react-redux';
import {logout} from '../store/store'
import axios from 'axios'
const {Header,Content,Footer} = Layout
import getConfnig from 'next/config'
const {publicRuntimeConfig} = getConfnig()

const githubIconStyle={
    color:'white',
    fontSize:40,
    display:'block',
    paddingTop:10,
    marginRight:20,
}

const footerStyle = {
    textAlign:'center'
}


function MyLayout({ children,user,logout,router }){
    const urlQuery = router.query && router.query.query

    const [search,setSearch] = useState(urlQuery || '')

    const handleSearchChange = useCallback((event)=>{
        setSearch(event.target.value)
    },[setSearch])
    const handleLogout=useCallback(()=>{
        logout()
    },[logout])


    const handleOnSearch = useCallback(()=>{
       router.push(`/search?query=${search}`)
    },[search]) 

    const userDropDown = (
        <Menu>
            <Menu.Item>
                <a href="javascript:void(0)" onClick={handleLogout}>
                    登出
                </a>
            </Menu.Item>
        </Menu>
    )
    return (
        <Layout>
            <Header>
               <div className="header-inner">
                <div className="header-left">
                        <div className="logo">
                           <Link href="/">
                           <GithubOutlined  style={githubIconStyle}/>
                           </Link>
                        
                        </div>
                        <div>
                            <Input.Search placeholder="搜索" 
                            value={search}
                            onChange={handleSearchChange}
                            onSearch={handleOnSearch}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                            {user && user.id?(
                                <Dropdown overlay={userDropDown}>
                                    <a href="/">
                                        <Avatar size={40} src={user.avatar_url}/>
                                    </a>
                                </Dropdown>
                            ):(
                                <Tooltip title="点击进行登录">
                
                                    <a href={ `/prepare-auth?url=${router.asPath}`}>
                                    <Avatar size={40} icon={<UserOutlined />} />
                                    </a>
                                </Tooltip>
                            )
                            }

                        </div>
                    </div>
               </div>
            </Header>
            <Content>
                <Container>
                      {children}
                </Container>
              
            </Content>
            <Footer style={footerStyle}>
                by wxx
            </Footer>
            <style jsx>{`
                .content{
                    color:red
                }
                .header-inner{
                    display:flex;
                    
                    justify-content:space-between;
                }
                .header-left{
                    display:flex;
                    justigy-content:flex-start;
                }
            `}</style>
            <style jsx global>
                {`
                    #__next {
                        height:100%;
                    }
                    .ant-layout{
                        min-height:100%;
                    }
                    .ant-layout-header{
                        padding-left:0;
                        padding-right:0;
                    }
                    .ant-layout-content{
                        background:#fff;
                    }
                `
                    
                
                }
            </style>
        </Layout>
    )
}

export default connect(
    function mapState(state){
        return {
            user:state.user,
        }
    },
    function mapReducer(dispatch){
        return {
            logout:()=> dispatch(logout())
        }
    }
)(withRouter(MyLayout))