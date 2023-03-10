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
import { initialState } from "../initialState";
// }from '@mckennatim/mqtt-hooks'

const lsh = ls.getItem();
console.log("in control ", lsh);

export default function Control() {
  const [client, publish] = useContext(Context);
  client.onMessageArrived = onMessageArrived;

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state: ", state);

  function reducer(state, action) {
    let nstate = { ...state };
    nstate[action.type] = action.payload;
    return nstate;
  }

  function onMessageArrived(message) {
    const { nsarr } = processMessage(message, devs, state);
    if (nsarr.length > 0) {
      nsarr.map((ns) => {
        const key = Object.keys(ns)[0];
        const action = { type: key, payload: ns[key] };
        dispatch(action);
      });
    }
  }

  const doOtherShit = (devs, zones, client) => {
    publish(client, "presence", "hello form do other shit");
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

  const renderControl = () => {
    if (!error) {
      return (
        <div>
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
                    <Icon>house</Icon>{" "}
                  </a>
                  {locdata && locdata.loc}{" "}
                </div>
              </div>
              <div style={styles.ur}>
                <a style={styles.a} href="./">
                  <Icon>{ico}</Icon>{" "}
                </a>
              </div>
              <button onClick={toggleOnOff("strike")}>toggle strike</button>
              <span>{state.strike.darr[0]}</span>
              <div style={styles.ll}>
                <div style={styles.txt}>
                  <span style={styles.otxt}>outside: </span>
                  {state.temp_out.darr[0]} &deg;F
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
          <img src={control} alt="main page" />
          <img src={zone} alt="zone page" />
          <img src={daysched} alt="daysched page" />
          <img src={wksched} alt="wksched page" />
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
