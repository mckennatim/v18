import React,{useContext} from 'react'
import {AContext} from '../contexts/acontext'

export default function Help(){
  const {visiblePages} = useContext(AContext)
  console.log('visiblePages: ', visiblePages)
  return(
    <div>
      <h4>connect</h4>
    </div>
  )
}