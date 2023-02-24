import React,{useContext} from 'react';
import {AContext} from '../contexts/acontext'
import ResponsivePages from  './ResponsivePages.js'

const appid = 'abltchelp'

export const NavCtrl=(props)=>{
  const{title}=props
  const{devInfo, path, handlePath, setAppid} = useContext(AContext)
  const{panes}=devInfo

  setAppid(appid)

  const renderNav = ()=>{
    return(
    <nav style ={styles.nav.nav}>
      <span> {title} {devInfo.dev} {panes} </span>
      <ul style ={styles.nav.ul}>
        <li style ={styles.nav.li}>
          <a onClick={handlePath('/connect')}>connect</a>
        </li>
        <li style ={styles.nav.li}>
          <a onClick={handlePath('/help')}>help</a>
        </li>
      </ul>
    </nav>
    )
  }

  return(
  <div> 
    {renderNav()}
    <ResponsivePages/>
  </div>    
  )
}


const styles ={
  nav: {
    ul:{
      textAlign: 'left',
      listStyleType: 'none',
      paddingLeft: '12px'
    },
    li:{
      display: 'inline',
      padding: '2px',
      paddingRight: '4px',
      background: 'whitesmoke'
    },
  },
}