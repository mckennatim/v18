import React,{Suspense} from 'react';
import {AProvider} from '../contexts/acontext'
import { NavCtrl } from "./NavCtrl.js";

export const App=(props)=> {
  const{title}=props

  return (
    <AProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <NavCtrl title={title}/>
        </div>
      </Suspense>
    </AProvider>
  );
}

