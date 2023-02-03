import React from 'react'
const compoi = {}
compoi['Help'] = React.lazy(() => import('./components/Help.js'));
compoi['Jobs'] = React.lazy(() => import('./components/Jobs.js'));
compoi['AddJob'] = React.lazy(() => import('./components/AddJob.js'));

const multi={
  default: 'jobs',
  jobs: [
    ['Jobs'],
    ['Jobs', 'Help'],
    ['Jobs', 'AddJob', 'Help']
  ],
  addjob:[
    ['AddJob'],
    ['AddJob', 'Jobs'],
    ['AddJob', 'Jobs', 'Help'],
  ],
  help:[
    ['Help'],
  ]
}

export{compoi, multi}