import React,{Suspense} from 'react';
import {ClientSocket} from '../../../@mckennatim_v1.0.1-1.23/mqtt-hooks/lib'
import {AProvider} from '../contexts/acontext'
import { NavCtrl } from "./NavCtrl.js";
import {cfg} from '../utilities/getCfg'

export const App=(props)=> {
  const{title}=props

  return (
    <ClientSocket cfg={cfg}>
      <AProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <NavCtrl title={title}/>
          </div>
        </Suspense>
      </AProvider>
    </ClientSocket>
  );
}

