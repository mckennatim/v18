import React, { createContext, useReducer, useState } from 'react';
import { createHashHistory } from 'history';
let history = createHashHistory();

const aInitState = {
  job2edit:'',
  foundJobs:[],
  dev:{},
  path:''
}

export const AContext = createContext(aInitState)

/* app specific actions*/
export const AReducer= (state,action)=>{
  switch(action.type){
    case 'sETjOB2eDIT':
      return{...state, job2edit:action.payload}
    case 'sETfOUNDjOBS':
      return {...state, foundJobs:action.payload}
  }
}

export const AProvider = ({children})=>{
  /* dispatcher to context of app specific state change*/
  const [state, dispatch] = useReducer(AReducer, aInitState)
  const [appid, setAppid] =useState('')

  /*general router and responsive code */
  const [devInfo,setDevInfo] =useState(getDevInfo())
  const [visiblePages, setVisiblePages] = useState([])
  const[path, setPath] = useState(window.location.hash.substr(1))

  function getDevInfo (){
    let ws = window.innerWidth
    let idx
    const types= [
      {dev:'watch', panes:1}, 
      {dev:'phone', panes:1}, 
      {dev:'phonel', panes:2}, 
      {dev:'tablet', panes:2}, 
      {dev:'tabletL', panes:3}, 
      {dev:'laptop', panes:3}, 
      {dev:'monitor', panes:4} 
    ]
    const sizes= [300, 500, 600, 800, 900, 1800, 3000]
    sizes.reduce((prev, curr, i)=>{ 
      if(prev < ws && ws <= curr){idx = i}
      return curr 
    }, 0);
    return types[idx]
  }

  window.onresize=()=>{
    if(getDevInfo().panes != devInfo.panes){
      setDevInfo(getDevInfo())
    }
  }
  
  window.onhashchange = ()=>{
    setPath(window.location.hash.substr(1))
  }
  
  const handlePath=(p)=>()=>{
    history.push(p)
    setPath(p)
  }

  

  /*app specific dispatch code for objects and functions in context */
  function setJob2edit(job2edit) {
    dispatch({
        type: 'sETjOB2eDIT',
        payload: job2edit
    });
  }

  function setFoundJobs(foundJobs){
    dispatch({
      type: 'sETfOUNDjOBS',
      payload: foundJobs
    })
  }

  return(
    <AContext.Provider value={{
      devInfo:devInfo,
      path:path,
      handlePath,
      visiblePages,
      setVisiblePages,
      appid,
      setAppid,
      foundJobs: state.foundJobs,
      job2edit: state.job2edit,
      setFoundJobs,
      setJob2edit
    }}>
      {children}
    </AContext.Provider>
  )
}