import React, {useContext} from 'react'
import {AContext} from '../contexts/acontext'


export default function AddJob (){
  const{foundJobs, setFoundJobs, setJob2edit, job2edit} = useContext(AContext)

  const update =()=>{
    setFoundJobs([
      {job:job2edit, category:''},
      {job:job2edit, category:'maintain'},
      {job:job2edit, category:'treework'}
    ])
  }
  return(
    <div style ={styles.addjob.div0}>
      AddJob
      <div>{job2edit}</div>

      <button onClick={update}>update</button>
    </div>
  )
}  

const styles ={
  addjob:{
    div0:{
      backgroundColor: '#c6a7a7'
    }
  }
}