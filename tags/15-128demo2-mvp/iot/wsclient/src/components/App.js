import React,{Suspense} from 'react';
import {ClientSocket} from '../../../@mckennatim/mqtt-hooks/src'
// import {ClientSocket} from '@mckennatim/mqtt-hooks'
import {AProvider} from '../contexts/acontext'
import { NavCtrl } from "./NavCtrl.js";
import {cfg} from '../utilities/getCfg'
import {appid} from "../appInit"

console.log(cfg);


export const App=(props)=> {
  const{title}=props

  return (
    <ClientSocket cfg={cfg}>
      <AProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <NavCtrl title={title} appid={appid}/>
          </div>
        </Suspense>
      </AProvider>
    </ClientSocket>
  );
}

