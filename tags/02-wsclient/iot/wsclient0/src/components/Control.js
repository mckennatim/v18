import React,{useContext, useState} from 'react'
import Paho from 'paho.mqtt.js'
import env from '../../env'


export default function Control (){

  const cfg = env.pv;
  console.log(cfg.url.mqtt_server, cfg.url.mqtt_port, cfg.appid+Math.random());
  
  var client = new Paho.Client(cfg.url.mqtt_server, cfg.url.mqtt_port, cfg.appid+Math.random());
  client.onConnectionLost =(responseObject)=>{
    if (responseObject.errorCode !== 0) {
      console.log('Connection Lost ' + responseObject.errorMessage);
    }
  }

  let tmess = "dog"

  function publish(topic, payload) {
    message = new Paho.Message(payload);
    message.destinationName = topic;
    client.send(message)
  }

  function subscribe() {
    client.subscribe(devtime, {
      onFailure: function (message) {
        tmess = cfg.url.mqtt_server+" subsrciption failed: "
      }
    }) 
    client.subscribe(userInf, {
      onFailure: function (message) {
        tmess = cfg.url.mqtt_server+" subsrciption failed: "
      }
    }) 
    client.subscribe(srstate, {
      onFailure: function (message) {
        tmess = cfg.url.mqtt_server+" subsrciption failed: "
      }
    })
    client.subscribe(timr, {
      onFailure: function (message) {
        tmess = cfg.url.mqtt_server+" subsrciption failed: "
      }
    })
    client.subscribe(sched, {
      onFailure: function (message) {
        tmess = cfg.url.mqtt_server+" subsrciption failed: "
      }
    })
    client.subscribe(flags, {
      onFailure: function (message) {
        tmess = cfg.url.mqtt_server+" subsrciption failed: "
      }
    })
  }

  const greenhouse = {"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHAiOiJncmVlbmhvdXNlIiwiZW1haWwiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJsb2MiOiIxMlBhcmxleVZhbGUiLCJyb2xlIjoidXNlciIsImV4cCI6MTYxOTM4NTg0MjAwOX0.wpMU24V7Vs6p57eqkTbT1fd63C6_19bbg0kRjZtmvqk"}

  function connect() {
    client.connect({
      onSuccess: onConnect,
      useSSL: cfg.ssl,
      onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
        // dmessage.innerHTML= "Connection failed: " + message.errorMessage;
      },
      userName: greenhouse.email,
      password: greenhouse.token
    });
  }

  function onConnect() {
    var lmess = 'Connected to '+cfg.url.mqtt_server
    console.log(lmess);
    // dmessage.innerHTML=lmess
    subscribe()
    publish('presence', 'Web Client is alive.. Test Ping! ');
    publish(req, '{"id":2,"req":"flags"}')
    publish(req, '{"id":0,"req":"srstates"}')
    publish(req, '{"id":1,"req":"progs"}')
    publish(req, '{"id":3,"req":"timr"}')
  }

  connect()

  const renderControl=()=>{
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