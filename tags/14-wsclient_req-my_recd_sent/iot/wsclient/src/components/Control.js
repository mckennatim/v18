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


/*  
temp_out: darr:[]
tstat: {pro:[[0,0,65,63]], timeleft:0, darr:[reading,onoff,66,64]},
tv: {pro:[[0,0,hi,lo]], darr:[reading,onoff,hi,lo]},
pond: {pro:[[0,0,0],[19,15,1]], timeleft:0, darr:[0,0,0]},
//solar: darr:[sra_rdg, srb_rdg, difon, difoff,maxa, maxb onoff]
*/
const initialState = {//pro must start at 0,0   
  contact: {darr:[1]},
  strike: {darr:[0], pro:[[0,0,0]], timeleft:0},
  ledRed: {darr:[1]},
  ledGreen: {darr:[0]},
  ledBlue: {darr:[0]},
  lr: {darr:[44, 0, 69, 67], pro:[[0,0,69,67]], timeleft:0},
  mb: {darr:[33, 0, 70, 40], pro:[[0,0,70,40]], timeleft:0},
  temp_out: {darr:[22]}
}

    const [state, dispatch] =useReducer(reducer, initialState);
    console.log('state: ', state);
    

    function reducer(state,action){
      let nstate = {...state}
      nstate[action.type]= action.payload
      return nstate
    }    

    function onMessageArrived(message){
      const {nsarr} = processMessage(message, devs, state)
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