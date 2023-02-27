import React from 'react'
import {cfg} from '../utilities/getCfg'
console.log('cfg: ', cfg)

const GoAuth = ()=>{
  const goRegister=()=>{
    console.log('go register')
    window.location.assign(cfg.url.authqry )
  }
  return(
    <div>
      <h3>in GoAuth</h3>
      <button onClick={goRegister}>register</button>
      <a href={cfg.authqry}>register</a>
    </div>
  )
}

export{GoAuth}