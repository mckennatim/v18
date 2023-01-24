import React,{useContext, useState, useEffect, useReducer} from 'react'
import {cfg, ls, makeHref} from '../utilities/getCfg'
import {
  connect,
  Context, 
  useDevSpecs,  
  processMessage, 
  setupSocket,
  monitorFocus,
  getDinfo
} from '../../../@mckennatim/mqtt-hooks/src'
//from '@mckennatim/mqtt-hooks

const lsh = ls.getItem()
console.log("in control ", lsh)


export default function Control (){

  const renderControl=()=>{

    const [client, publish] = useContext(Context);
    client.onMessageArrived= onMessageArrived


    const initialState = {//pro must start at 0,0 
      temp_attic: {darr:[0,0,0,0]},
      hum_attic: {darr:[0,0,0,0]},
      temp_out: {darr:[0,0,0,0]},
      lux: {darr:[0]},
      mb: {darr:[0,0,0,0]},
      gh_temp: {darr:[0,0,0,0]},
      gh_hum: {darr:[0,0,0,0]},
      gh_timr: {pro:[[0,0,0],[18,15,1]], timeleft:0, darr:[0,0,0]},
      sgh_temp: {darr:[0,0,0,0]},
      sgh_hum: {darr:[0,0,0,0]},
      sgh_timr: {pro:[[0,0,0],[19,15,1]], timeleft:0, darr:[0,0,0]}
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    console.log('state: ', state);
    

    function reducer(state,action){
      console.log('in reducer: ');
      console.log(action);
      let nstate = {...state}
      nstate[action.type]= action.payload
      console.log('nstate: ');
      return nstate
    }    

    function onMessageArrived(message){
      const nsarr = processMessage(message, devs, state)
      if(nsarr.length>0){
        nsarr.map((ns)=>{
          const key =Object.keys(ns)[0]
          const action = {type:key, payload:ns[key]}
          dispatch(action)
        })
      }
    }

    const doOtherShit=(devs, zones, client)=>{
      publish(client, "presence", "hello form do other shit")
    }

    const topics  = ['srstate', 'sched', 'flags', 'timr']

    const {devs, zones, binfo, error}= useDevSpecs(ls, cfg, client, (devs,zones)=>{
      if(!client.isConnected()){
        connect(client,lsh,(client)=>{
          if (client.isConnected()){
            setupSocket(client, devs, publish, topics, (devs, client)=>doOtherShit(devs, zones, client))
          }
        })
      }else{
        setupSocket(client, devs, publish, topics, (devs, client)=>doOtherShit(devs, zones, client))
      }
    })

    return(
      <div>
        <p>Simple page to operate as an mqtt ws client that can send and recieve payloads to a test device
        </p>
      </div>
    )
  }

  return(
    <div style ={styles.ctrl.div0} >
      <h4>Control</h4>
      {renderControl()}
    </div>
  )
}

const styles = {
  ctrl:{
    div0:{
      backgroundColor: '#e5bf37'
    }
  }
}