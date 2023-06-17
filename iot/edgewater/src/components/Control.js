import React, { useContext, useState, useEffect, useReducer } from "react";
import Icon from "@mui/material/Icon";
import { cfg, ls, makeHref } from "../utilities/getCfg";
import {
  connect,
  Context,
  useDevSpecs,
  processMessage,
  setupSocket,
  monitorFocus,
  getDinfo,
} from "../../../@mckennatim/mqtt-hooks/src";
import { initialState, appid, ctrltypes } from "../appInit";
// }from '@mckennatim/mqtt-hooks'

const lsh = ls.getItem();
console.log("in control ", lsh);

export default function Control() {
  const [client, publish] = useContext(Context);
  client.onMessageArrived = onMessageArrived;

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    let nstate = { ...state };
    nstate[action.type] = action.payload;
    // console.log('state: ', state);
    // console.log('action: ', action);
    // console.log('nstate: ', nstate);
    return nstate;
  }

  function onMessageArrived(message) {
    const { nsarr } = processMessage(message, devs, state);
    if (nsarr.length > 0) {
      nsarr.map((ns) => {
        const key = Object.keys(ns)[0];
        const action = { type: key, payload: ns[key] };
        console.log('action: ', action.payload);
        dispatch(action);
      });
    }
  }

  const doOtherShit = (devs, zones, client) => {
    publish(client, "presence", "hello form do other shit");
    console.log("devs: ",devs);
    const topic = `${Object.keys(devs)[0]}/req`
    const payload = `{"id":2, "req":"flags"}`
    console.log("topic, payload: ",topic,payload);
    // publish(client, topic, payload)
  };

  const topics = ["srstate", "sched", "flags", "timr"];

  const { devs, zones, binfo, error } = useDevSpecs(
    ls,
    cfg,
    client,
    (devs, zones) => {
      if (!client.isConnected()) {
        connect(client, lsh, (client) => {
          if (client.isConnected()) {
            setupSocket(client, devs, publish, topics, (devs, client) =>
              doOtherShit(devs, zones, client)
            );
          }
        });
      } else {
        setupSocket(client, devs, publish, topics, (devs, client) =>
          doOtherShit(devs, zones, client)
        );
      }
    }
  );

  const goSignin = () => {
    const href = makeHref(window.location.hostname, "signin", "");
    console.log('href: ', href); //, `?${locid}`)
    window.location.assign(href);
  };

  const toggleOnOff = (typ) => () => {
    const newt = !state[typ].darr[0] * 1;
    console.log("newt: ", newt);
    console.log("typ: ", typ);
    
    const di = getDinfo(typ, devs);
    console.log("di: ", di);
    const topic = `${di.dev}/cmd`;
    const payload = `{"id":${di.sr},"sra":[${newt}]}`;
    console.log("topic,payload: ", topic, payload);
    publish(client, topic, payload);
  };

  const handleNewTstat = key=> event=>{
    if (event.key === 'Enter') {
      const val = event.target.value*1
      const di = getDinfo(key, devs);
      console.log('di: ', di);
      const dif = Math.round((state[key].darr[2]-state[key].darr[3])/2)
      console.log('dif: ', dif);
      const newt = [val+dif, val-dif]
      const topic = `${di.dev}/cmd`;
      const payload = `{"id":${di.sr},"sra":[${newt}]}`;
      console.log("topic,payload: ", topic, payload);
      publish(client, topic, payload);
    }
  }
  const handleTsec = key=> event=>{
    if (event.key === 'Enter') {
      const val = event.target.value*1
      const di = getDinfo(key, devs);
      console.log('di: ', di);
      const topic = `${di.dev}/cmd`;
      const payload = `{"id":${di.sr},"sra":[],"tsec":${val}}`;
      console.log("topic,payload: ", topic, payload);
      publish(client, topic, payload);
    }
  }

  const handleNewProg = key => event =>{
    if (event.key === 'Enter') {
      const tarr = event.target.value
      console.log('key, event.target: ', key, event.target.value);
      const di = getDinfo(key, devs);
      const topic = `${di.dev}/prg`;
      const payload = `{"id":${di.sr},"pro":[${tarr}]}`;
      console.log("topic,payload: ", topic, payload);
      publish(client, topic, payload);
    }
  }  
  
  const handleDarrCng = key => event =>{
    // console.log('event.key, key: ', event.key, key);
    // alert(`event.key ${event.key}`)
    if (event.key === 'Enter' || event.key === 'Q'|| event.key=='q') {
      
      const arr = event.target.value.split(',').map(a=>a*1)
      
      console.log('arr: ', arr);
      const tarr = {ctype:"relay", darr: arr, timeleft: 0}
      const action = { type: key, payload: tarr };
      dispatch(action);
      console.log('key, event.target: ', key, event.target.value);
      const di = getDinfo(key, devs);
      const topic = `${di.dev}/cmd`;
      const payload = `{"id":${di.sr},"sra":[${arr}]}`;
      console.log("topic,payload: ", topic, payload);
      publish(client, topic, payload);
    }
  }

  const handleDarrBtn = key => event =>{
    console.log('key,event: ', key,event);
    const di = getDinfo(key, devs);
    const topic = `${di.dev}/cmd`;
    const payload = `{"id":${di.sr},"sra":[${state[key].darr}]}`;
    console.log("topic,payload: ", topic, payload);
    //publish(client, topic, payload);
  }

  const handleRawCmd = event =>{
    if (event.key === 'Enter') {
      const payload = event.target.value
      console.log('event.target: ', event.target.value);
      const topic = `CYURD128/cmd`;
      // const payload = `{"id":${di.sr},"pro":[${tarr}]}`;
      console.log("topic,payload: ", topic, payload);
      publish(client, topic, payload);
    }  
  }

  const renderControl = () => {
    if (!error) {
      // console.log('state: ', state);
      const listData = Object.keys(state).map((key, i) => {
        if(devs){
          const di = getDinfo(key, devs);
          const ctype = state[key].ctype 
          // console.log('state[key]: ', state[key]);
          const darlen = state[key].darr?state[key].darr.length:0
          let darr = `[`
          if(ctype) {
            const clen= ctrltypes[ctype]["cmd"].length
            ctrltypes[ctype]["cmd"].map((c,j)=>{
              darr +=`${state[key].darr[c]}${j+1==clen?'':','} `
            })
          }  
          darr += `]`
          const crInput = ()=>{
            if(ctype && darlen>0){
            return(
            <span>
            <input size="2" type="text" onKeyDown={handleDarrCng(key)}></input>
            {/* <button onClick={handleDarrBtn(key)}>change</button> */}
            </span>)

          }
            // console.log(state[key].ctype);
          }
          return(
          <li key={i}>
            <span>  
              <span>{di.dev } {di.sr} {key} {ctype} {darr}</span>
              {crInput()}
              {state[key].pro && 
                <span> pro: {JSON.stringify(state[key].pro)} [
                <input size="20" type="text" onKeyDown={handleNewProg(key)}></input> ]
                </span>
              }
              {state[key].timeleft >=0 && 
                <span> timeleft:  {JSON.stringify(state[key].timeleft)}
                <input size="1" type="text" onKeyDown={handleTsec(key)}></input>
                </span>
              }

            </span>
          </li>)
        }
      });
      return (
        <div>
          <ul>{listData}</ul>
          [0,0,1],[21,55,0]
          [0,0,69,67],[13,13,72,70]
          <p>&#123;&quot;id&quot;:3, &quot;sra&quot;:[1, 240]&#125;</p>
          <br/>
          <input size="80" type="text" onKeyDown={handleRawCmd}></input>
          
          <p>
            Simple page to operate as an mqtt ws client that can send and
            recieve payloads to a test device
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>{error.qmessage}</p>
        </div>
      );
    }
  };

  const rrender = () => {
    if (!error) {
      const { locdata } = binfo;
      const ico =
        status == "blur-disconnected" ? "block" : "signal_cellular_alt";
      return (
        <div>
          <header style={styles.header}>
            <div style={styles.container}>
              <div style={styles.ul}>
                <div>
                  <a style={styles.a} href="./">
                  </a>
                  {locdata && locdata.loc}{" "}
                </div>
              </div>
              <div style={styles.ur}>
                <a style={styles.a} href="./">
                  <Icon>{ico}</Icon>{" "}
                </a>
              </div>
              <div style={styles.ll}>
                <div style={styles.txt}>
                  <span style={styles.otxt}>outside: </span>
                  {state.temp_out.darr[0]} &deg;F QQQ
                </div>
              </div>
            </div>
          </header>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            From this app on this machine&#39;s perspective, {error.qmessage} It
            is probably best to
            <button onClick={goSignin}>go and (re-)signin</button>. But maybe
            nobody has registered you to a paticular location that has some iot
            devices that run this app. then this is as far as you can go. You
            can see some screenshots of the app below.
          </p>
          {/* <img src={control} alt="main page" />
          <img src={zone} alt="zone page" />
          <img src={daysched} alt="daysched page" />
          <img src={wksched} alt="wksched page" /> */}
        </div>
      );
    }
  };

  return (
    <div style={styles.ctrl.div0}>
      {rrender()}
      <h4>Control</h4>
      {renderControl()}
    </div>
  );
}

const styles = {
  ctrl: {
    div0: {
      backgroundColor: "#e5bf37",
    },
  },
};
