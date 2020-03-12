import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'

import MyContext from '../lib/my-context'
import Layout from '../components/Layout'

import testHoc from '../lib/with-redux'
import PageLoading from '../components/PageLoading';
import { Router } from 'next/router'
class MyApp extends App {
  state = {
    context: 'value',
    loading:false
  }

  startLoading = ()=>{
      this.setState({
          loading:true,
      })
  }
  stopLoading = ()=>{
      this.setState({
          loading:false,
      })
  }



  componentDidMount(){
    Router.events.on('routeChangeStart',this.startLoading)
    Router.events.on('routeChangeComplete',this.stopLoading)
    Router.events.on('routeChangeError',this.stopLoading)
    
  }

  componentWillUnmount(){
    Router.events.off('routeChangeStart',this.startLoading)
    Router.events.off('routeChangeComplete',this.stopLoading)
    Router.events.off('routeChangeError',this.stopLoading)
  }

  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps,
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
            <Provider store={reduxStore}>
                {this.state.loading? <PageLoading />:null}
                <Layout>
        
                    <MyContext.Provider value={this.state.context}>
                    <Component {...pageProps} />
                    </MyContext.Provider>
                </Layout> 
         </Provider>
      </Container>
    )
  }
}

export default testHoc(MyApp)
