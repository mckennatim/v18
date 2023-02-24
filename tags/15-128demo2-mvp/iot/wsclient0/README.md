# React router is history. A lazy mobile web response to hash that context.

My customers are not that fancy. They don't need to Play in the App store; they cannot afford to have to go there or have me cover all those bases. Besides, lot of times it is just easier to get work done on a big laptop screen.

A mobile app often consists of multiple pages, only one of which you can see at a time. A computer monitor's webpage, on the other hand, can contain multiple mobile pages side by side, a little bit like a dashboard

### The specification:

Use the same codebase, on mobile devices, pads and computers. 

Only load the code you need for what you want to see

On a computer, where you can have multiple mobile pages on one screen, any changes in one page must automatically update any other visible pages. 

Page forward and page back should work as one would expect. 

Deploying a app has to be easy and go anywhere. They can be put on domain of their own or in a subdirectory of a subdomain. No changes to the server are required. A $5/mo vps can handle lots of these apps.

### The realization: 

#### Routing is history

I really don't mind hash routing; I don't feel the need for server-side rendering. I am willing to live with that since deployment can be to anywhere as easy as

    rsync -av -e ssh prod/ root@apps.sitebuilt.net:/home/apps/public_html/jobs

and switching pages can be done in  the url bar or programmatically

    window.onhashchange = ()=>{
        setPath(window.location.hash.substr(1))
    }
    
    const handlePath=(p)=>()=>{
        history.push(p)
        setPath(p)
    }

### Responding to device

What I want to see on different devices is related to their width so I want  to listen for `window.onresize` and associate width with device types whether it is a phone in landscape mode or  big computer monitor.

    function getDevInfo (){
        let ws = window.innerWidth
        let idx
        const types= [
        {dev:'watch', panes:1}, 
        {dev:'phone', panes:1}, 
        {dev:'phonel', panes:2}, 
        {dev:'tablet', panes:2}, 
        {dev:'tabletL', panes:3}, 
        {dev:'laptop', panes:3}, 
        {dev:'monitor', panes:4} 
        ]
        const sizes= [300, 500, 600, 800, 900, 1800, 3000]
        sizes.reduce((prev, curr, i)=>{ 
        if(prev < ws && ws <= curr){idx = i}
        return curr 
        }, 0);
        return types[idx]
    }

    window.onresize=()=>{
        if(getDevInfo().panes != devInfo.panes){
        setDevInfo(getDevInfo())
        }
    }

Since `handlePath` might need to be accessible from any page, I have put all this stuff in a shared context. 

### The lazy response routes

In this scenario, every app that wants to have reponsive pages has to have a `responsiveRoutes.js` file. This always gets imported to the generic `ResponsivePages` component, providing the content and the responsive design.

    import React,{lazy} from 'react'
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

`ResponsivePages` creates an grid container containing an array of pages, but just the right amount of pages needed for a particular device type.

    import React, {useContext} from 'react'
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
      const{devInfo, path} = useContext(AContext)
      const {panes} = devInfo
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

      const pages = pgArr[0].map((n,i)=>{
        return React.createElement(compoi[n], {key:i}, null)
      })
      return(
        <div style ={styles.container} >
          {pages}
        </div>    
      )
    }






