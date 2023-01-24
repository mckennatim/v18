import React, {useContext, useEffect} from 'react'
import {compoi, multi} from '../responsiveRoutes'
import {AContext} from '../contexts/acontext'

const styles={
  container:{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    backgroundColor: '#ece6ed'
  },
}

export default function ResponsivePages(){
  const{devInfo, path, visiblePages, setVisiblePages} = useContext(AContext)
  const {panes} = devInfo

  useEffect(()=>{
    let noSlPath = path.substr(1)
    if(!multi[noSlPath]){
      noSlPath = multi.default
    }
    let pgArr =[]
  
    const nextBest =(arr, panes)=>{
      const sa= arr.filter((a)=>a.length == panes)
      if(sa.length>0) {
        pgArr = sa
        return sa
      } else {
        nextBest(arr, panes-1)
      }
    }
  
    nextBest(multi[noSlPath], panes)
    setVisiblePages(pgArr[0])
  },[panes, path])


  const renderPages = visiblePages.map((n,i)=>{
    return React.createElement(compoi[n], {key:i}, null)
  })

  return(
    <div style ={styles.container} >
      {renderPages}
    </div>    
  )
}