import React, {useState, useEffect} from 'react'
import {parseQuery}from '../utilities/wfuncs'
import {fetchLocs, fetchLocApps} from '../services/fetches'
import {ls, cfg} from '../utilities/getCfg'
// import { map } from 'rxjs/operators';

const FromAuth = (props)=>{
  const [locids, setLocids] = useState([])
  console.log('props: ', props)
  const qry = parseQuery(props.cambio.page.params.query)
  const message=(decodeURIComponent(qry.message))

  if (qry.token){
    ls.setItem({email:qry.email, token:qry.token})
  }

  const getLocs =()=>{
    if(ls.getItem()){
      console.log('getting locs: ')
      fetchLocs(ls.getKey('token')).then((locs)=>{
        const locarr =locs.results.map((l)=>l.locid)
        setLocids(locarr)
      })
    }
    return locids
  }
  const getLocApps=(locid)=>()=>{
    console.log('locid: ', locid)
    fetchLocApps(ls.getKey('token'), locid).then((apps)=>{
    console.log('apps: ', apps.results)
    })
  }
  useEffect(()=>{
    getLocs()
  },[])

  const dowhat =()=>{
    const mstyle = makeStyle(style.li, props.responsive.size)
    console.log('mstyle: ', mstyle)
    console.log('message: ', message)
    console.log('ls.GetItem(): ', ls.getItem())
    if (!ls.getKey('email')){
      return(
        <div>
        <h4>You shit outta luck</h4>
        <p>There is no data  <a href="#goauth">register</a></p>
        </div>
      )
    } else if (!ls.getKey('token')){
      return(
        <div>
        <h4>You shit outta luck</h4>
        {message===undefined ? <span>{message}</span> : <span>Hi dog, no token in url query or in local storage. Want to <a href={cfg.url.authqry}>register</a>?</span>}
        </div>
      )
    } else {
      //const data = getLocs()
      console.log('locids: ', locids)
      return(
        <div>
        <h4>You have apps at at least one location</h4>
        <ul>
        {locids.map((d,i)=>(
          <li key={i} style={mstyle} onClick={getLocApps(d)}>{d}</li>
        ))}
        </ul>
        {/* <button onClick={getLocs}>get locations you have apps at</button> */}
        </div>
      )
    }
  }

  return(
    <div>
      <h4>{ls.getKey('email')}, Here you might
      
       find your locations </h4>
      {dowhat()}
    </div>
    
  )
}

export{FromAuth}

let style ={
  li:{
    display: "block",
    width: "50%",
    padding: "10px",
    background:"white",
    border: "solid 1px"
  }
}

const makeStyle =(s,sz)=>{
  const n = {}
  if (sz<500){
    n.width="80%"
  }
  return ({...s, ...n})

}



// console.log('stlyl.li ', {...style.li, background:'yellow'})

// console.log('makeStyle(sthle.li, {background:"yellow"}): ', makeStyle(style.li, {background:"yellow"}))