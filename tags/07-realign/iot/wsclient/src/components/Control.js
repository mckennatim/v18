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
// }from '@mckennatim/mqtt-hooks'

const lsh = ls.getItem()
console.log("in control ", lsh)


export default function Control (){

  const renderControl=()=>{

    const [client, publish] = useContext(Context);
    client.onMessageArrived= onMessageArrived


    const initialState = {//pro must start at 0,0 
      contact: {darr:[1]},
      redLED: {darr:[1]},
      greenLED: {darr:[1]},
      blueLED: {darr:[1]},
      strike: {darr:[0]},
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
      const {nsarr, coremsg} = processMessage(message, devs, state)
      console.log('nsarr, coremsg: ', nsarr, coremsg );
      if(nsarr.length>0){
        nsarr.map((ns)=>{
          const key =Object.keys(ns)[0]
          const action = {type:key, payload:ns[key]}
          dispatch(action)
        })
      }
    }

    const doOtherShit=(devs, zones, client)=>{
      console.log('client: ', client);
      console.log('in doothershit: ');
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

    console.log('error: ', error);
    if (!error){
      return(
        <div>
          <p>Simple page to operate as an mqtt ws client that can send and recieve payloads to a test device
          </p>
        </div>
      )
    } else {
      return(
        <div>
          <p>{error.qmessage}
          </p>
        </div>
      )      
    }
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