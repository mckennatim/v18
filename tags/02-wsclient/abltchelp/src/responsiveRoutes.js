import React from 'react'
const compoi = {}
compoi['Help'] = React.lazy(() => import('./components/Help.js'));
compoi['Connect'] = React.lazy(() => import('./components/Connect.js'));

const multi={
  default: 'connect',
  connect: [
    ['Connect'],
    ['Connect', 'Help']
  ],
  help:[
    ['Help'],
    ['Connect', 'Help']
  ]
}

export{compoi, multi}