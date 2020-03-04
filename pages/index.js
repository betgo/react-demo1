import Link from 'next/link';
import {Button} from "antd"
import Router from 'next/router';

export default ()=>{
  

  function gotoTestB(){
    Router.push('/test/b')
  }
   return(
     <>
  <Link href="/a" title="AAA">
    <Button>Index</Button>
  </Link>
  <Button onClick={gotoTestB}>test b</Button>

    </>
)}