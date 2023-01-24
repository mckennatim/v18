import React,{useContext, useState} from 'react'



export default function Control (){

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