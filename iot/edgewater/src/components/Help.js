import React,{useContext} from 'react'
import {AContext} from '../contexts/acontext'

export default function Help(){
  const {visiblePages} = useContext(AContext)
  return(
    
    <div style ={styles.help.div0}>
      {visiblePages.map((p,i)=>(<div key={i}>{p}</div>))}
      <h3>Edgwater Water Control</h3>

      <p>Edgewater Water Control (EWC) generally operates without WIFI/internet with default settings for successive watering of zone 1, 2, 3 & 4. The current default setting is 60 minutes (3600 sec) for each zone</p>

      <p>On startup, EWC does search for a WIFI connection for about 4 minutes before it is ready to operate.</p>

      <h4>phone hot spot control</h4>
      <p></p>

    </div>
  )
}

const styles ={
  help:{
    div0:{
      backgroundColor: '#c7b1c9'
    }
  }
}