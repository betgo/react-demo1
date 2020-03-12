
import { withRouter } from 'next/router'
import api from '../lib/api';
function Search({ router,repos}) {
    console.log(repos)
    return <span>{router.query.query}</span>
}


Search.getInitialProps = async ({ ctx}) => {

    const { query, sort, lang, page, order } = ctx.query
  
    if (!query)
        return {
            repos: {
                total_count: 0
            }
        }
    let queryString = `?query=${query}`
    if (lang) queryString = queryString + `&language=${lang}`
    if (sort) queryString = queryString + `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString = queryString + `&page=${page}`

    let result = await api.request({
        url: `/search/repositories${queryString}`
    }, ctx.req, ctx.res)
    return {
        repos: result.data
    }
}

export default withRouter(Search)

