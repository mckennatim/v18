import React,{useContext, useState} from 'react'
import {AContext} from '../contexts/acontext'


export default function Jobs (){
  const{foundJobs, setFoundJobs, setJob2edit, job2edit} = useContext(AContext)
  const[job, setJob]=useState('')

  const onEnter =(e)=>{
    if (e.key === 'Enter') {
      setJob2edit(job)
    }
  }

  const renderJobs=()=>{
    const jobs = foundJobs.map((j,i)=>{
      return (
        <li key={i}>
          <span> {j.job} </span>
          <span> {j.category} </span>
        </li>
      )
    })
    return(
      <div>
        <div>{job2edit}</div>
        <input type="text" onKeyDown={onEnter}   onChange={(e)=>setJob(e.target.value)}/>
        <ul>
          {jobs}
        </ul>
      </div>
    )
  }

  return(
    <div style ={styles.jobs.div0} >
      Jobsaa
      {renderJobs()}
    </div>
  )
}

const styles = {
  jobs:{
    div0:{
      backgroundColor: '#aa9898'
    }
  }
}