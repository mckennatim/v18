import React, {useState, useContext, useEffect} from 'react'// eslint-disable-line no-unused-vars

import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';// eslint-disable-line no-unused-vars
import {AContext} from '../contexts/acontext'
import {putHelpQues, putHelpAns, delHelp, putVote } from '../fetchHelp'





export default function HelpApp ({ahelp}){
  const [letvote,]=useState(true)
  const [toggles,setToggles]=useState(new Array(100).fill(false))
  const [newQ, toggleNewQ]= useState(false)
  const [newQtxt, setNewQtxt]= useState('')
  const {visiblePages,appid} = useContext(AContext)
  const [hpage, setHpage] = useState(visiblePages[0])
  const [help, setHelp] = useState(ahelp)
  console.log('appid: ', appid)

  useEffect(()=>{
    setHelp(ahelp)
  },[ahelp])

  const vote=(ids ,up, vtype)=>()=>{
    // const maxvotes =2
    const isup = up ? 1 : -1
    const idtype = vtype=='qrank' ? 'qid' : 'aid'
    const qa = vtype=='qrank' ? 'q' : 'a'
    // const st3 = vtype+'st'
    const vhelp =[...help]
    const qidx = vhelp.findIndex((h)=>h.qid*1==ids[0]*1)
    const qrec = vhelp[qidx]
    if(vtype=='qrank'){
      const newrank = qrec[vtype] += isup
      qrec[vtype] =newrank
      putVote(appid, {vtype, idtype, qa, id:ids[0]*1, rank:newrank})
    }else{
      const vans = [...qrec.indent]
      const vidx = vans.findIndex((h)=>h.aid*1==ids[1]*1)
      vans[vidx].arank += isup
      vans
      .sort((a,b)=>b.arank<a.arank ? -1 : 1)
      qrec.indent=vans
      putVote(appid, {vtype, idtype, qa, id:ids[1]*1, rank:vans[vidx].arank})
    }
    vhelp[qidx]=qrec
    vhelp
    .sort((a,b)=>{
      if (b.pagename===a.pagename){
        return b.qrank<a.qrank ? -1 : 1
      }
      return b.pagename>a.pagename ? -1 : 1
    })
    setHelp(vhelp)
  }

  const toggle=(i)=>()=>{
    let togs = [...toggles]
    togs[i]= !togs[i]
    setToggles(togs)
  }

  const dispUniTitl=(bhelp,h,i)=>()=>{
    let tf = true
    if(bhelp[i-1] && bhelp[i-1].pagename==h.pagename) {
      tf= false
    }
    return tf
  }

  const editQfield = (ed)=>{
    const nhelp = [...help]
    const hidx = nhelp.findIndex((h)=>h.qid==ed.qid)
    nhelp[hidx][ed.field]=ed.value
    setHelp(nhelp) 
  }

  const editAfield =(ed)=>{
    const nhelp = [...help]
    const hidx = nhelp.findIndex((h)=>h.qid==ed.qid)
    const ans  = [...nhelp[hidx].indent]
    const aidx = ans.findIndex((a)=>a.aid==ed.aid)
    ans[aidx][ed.field]=ed.value
    nhelp.indent =ans
    setHelp(nhelp)
  }

  const editAns =(ed)=>(e)=>{
    if(!ed.value){
      ed.value = e.target.value
    }
    editAfield(ed)
  }

  const editQues=(ed)=>(e)=>{
    console.log('ed: ', ed)
    if(!ed.value){
      ed.value = e.target.value
    }
    editQfield(ed)
  }

  const submitQ =(h,i)=>(e)=>{
    console.log('submitQ', h, i)
    e.preventDefault()
    editQfield({field:'qedit', qid:h.qid, value:false})
    saveQ(h)
  }

  const submitA =(h,i)=>(e)=>{
    console.log('submitA', h, i)
    e.preventDefault()
    editAfield({field:'aedit', qid:h.qid, aid:h.aid, value:false})
    delete h.arankst
    delete h.aedit
    saveA(h)
  }

  const addAns=(q)=>()=>{
    console.log('a: ', a)
    const a={qid:q.qid, aid:9999, hereshow:'heres how', aedit:true, arank:0}
    const nhelp = [...help]
    const hidx = nhelp.findIndex((h)=>h.qid==q.qid)
    nhelp[hidx].indent.push(a)
    setHelp(nhelp) 
    console.log('help: ', help, nhelp[hidx])
  }

  const submitNewQ =()=>{
    const m={
      pagename:hpage, 
      appid:appid,
      qid:8888, 
      howto:newQtxt, 
      indent:[],
      qrank: 0
    }
    toggleNewQ(false)
    setNewQtxt('')
    saveQ(m)
  }

  const saveQ =(m)=>{
    putHelpQues(appid, {qid:m.qid, howto:m.howto, appid:m.appid, pagename:m.pagename})
    .then((res)=>{
      if(m.qid*1==8888){
        m.qid = res.results[0].insertId
        const newhelp =[...help]
        newhelp.push(m)
        newhelp
        .sort((a,b)=>{
          if (b.pagename===a.pagename){
            return b.qrank<a.qrank ? -1 : 1
          }
          return b.pagename>a.pagename ? -1 : 1
        })
        console.log('newhelp: ', newhelp)
        setHelp(newhelp)
      }
    })
  }

  const saveA =(m)=>{
    putHelpAns(appid, m)
    .then((res)=>{
      if(m.aid*1==9999){
        editAfield({field:'aid', qid:m.qid, aid:9999, value:res.results[0].insertId })
      }
    })
  }

  const delQ=(id)=>()=>{
    const nhelp = help.filter((h)=>h.qid*1 != id*1)
    setHelp(nhelp)
    delHelp(appid, id ,'q')
  }

  const delA=(qid, aid)=>()=>{
    const nhelp = [...help]
    const hidx = nhelp.findIndex((h)=>h.qid*1==qid*1)
    const ans  = [...nhelp[hidx].indent]
    const dans = ans.filter((a)=>a.aid*1!=aid*1)
    nhelp[hidx].indent =dans
    setHelp(nhelp)
    delHelp(appid, aid ,'a')
  }

  const renderAnswers=(h)=>()=>{
    return(
      <div style={style.ai.div}>
      <ul style={style.list.ul}>
      {h.indent.map((m,j)=>{
        if(!m.aedit){
          return(
            <li style={style.list.li} key={j}>
              {letvote &&
              <Vote m={[h.qid, m.aid]} vote={vote} vtype='arank' num={m.arank} style={v.r}/>
              }
              <div style={style.list.hhow}>
                {m.hereshow} 
                {/* ({h.qid}, {m.aid}) */}
              </div><br/>
              <i onClick={editAns({field:'aedit', qid:h.qid, aid:m.aid, value:true})} className="material-icons">edit</i>
              <i onClick={delA(h.qid, m.aid)}  className="material-icons">clear</i>
            </li>
            )
        }else{
          m.hereshow = !m.hereshow ? '' : m.hereshow
          return (
          <div>
            <textarea name="d" id="" cols="30" rows="4" value={m.hereshow} 
              onChange={editAns({field:'hereshow', qid:h.qid, aid:m.aid})}/>
            <button 
              onClick={
                submitA(m)}>Submit</button>
          </div>
          )
        }
        })}
      </ul>
      </div>
    )
  }

  const renderQuestion=(h,i)=>()=>{
    if(!h.qedit){
      return(
      <div style={style.sum.div}>
        <div onClick={toggle(i)} style={style.sum.how}>
          {h.howto} 
          {/* ({h.qid}) */}
        </div>
        {letvote &&
        <Vote m={[h.qid]} vote={vote} vtype='qrank' num={h.qrank} style={v.r}/>
        }
      </div>
      )
    }else{
      return(
        <form onSubmit={submitQ(h,i)} key={i}>
        <textarea name={h.qid} id={h.qid} cols="30" rows="4" value={h.howto} onChange={editQues({field:'howto', qid:h.qid})}/>
        <input type="submit" value="Submit" />
        </form>
      )
    }
  }

  const renderNewQ = ()=>{
    if(!newQ){
      return(
        <i onClick={()=>toggleNewQ(!newQ)} className="material-icons">add</i>
      )
    }else{
      return(
        <div>
          <select onChange={(e)=>setHpage(e.target.value)}>
          {visiblePages.map((r,j)=>{
            return (<option value={r} key={j}>{r}</option> )
          })}
          </select>  
          <textarea name="d" id="" cols="30" rows="4" value={newQtxt} 
          onChange={(e)=>setNewQtxt(e.target.value)}/>
          <button onClick={submitNewQ}>Submit</button>
        </div>
      )
    }
    
  }

  return(
  <div style={style.outer} >
    <h4> Help {renderNewQ()}</h4>
    
    {help.map((h,i)=>{
      const theq = renderQuestion(h,i)
      const detli = renderAnswers(h,i)
      const titl = dispUniTitl(help,h,i)()
      return(
      <div key={i}>
        {titl && h.pagename}
      <Accordion  key={i} expanded={toggles[i]}>
        <AccordionSummary >
          {theq()}
        </AccordionSummary>
        <AccordionDetails>
        <div>
          {detli()}
          <div style={style.qi.div}>
          <i onClick={addAns(h)}  className="material-icons">add</i>
          <i onClick={delQ(h.qid)}  className="material-icons">clear</i>
          <i onClick={editQues({field:'qedit', qid:h.qid, value:true})}className="material-icons">edit</i>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
      </div>
      )
    })}
    
  </div>
  )
}


function Vote(props){// eslint-disable-line no-unused-vars
  const{m, vote, vtype, style, num}= props
  const st3 = vtype+'st'
  // console.log('m[idtype]: ', m[idtype], vtype)
  return(
    <div style={style.vote}>
      <i onClick={vote(m, true, vtype)} 
      className="material-icons"
      style={m[st3]>0 ? {color:'orange'} : {color:'lightgrey'}}>
          keyboard_arrow_up
      </i>
      {num}
      <i onClick={vote(m, false, vtype)} 
      className="material-icons"
      style={m[st3]<0 ? {color:'orange'} : {color:'lightgrey'}}>
        keyboard_arrow_down
      </i>
    </div>
    )
}


const v = {
  r: {
    vote:{
      float: 'right',
      padding:'0 0 0 3px'
    }
  },
  l:{
    vote:{
      float: 'left',
      padding:'0 0 0 3px'
    }
  }
}



const style = {
  ai:{
    div:{
      display: 'block',
    }
  },
  qi:{
    div:{
      display:'block',
    }
  },
  add:{
  },
  outer:{
    overflow:'hidden',
    padding: '4px',
    margin: '2px 10px 10px 10px',
    background: '#99CCFF'
  },
  he:{
    overflow:'hidden',
    margin: '2px 10px 10px 10px',
   padding: '4px',
    background: '#C4A265'
  },
  list:{
    ul:{ 
      listStyleType: 'none',
      paddingInlineStart: '0px',
      width:'100%'
      //display: 'flex',
      //flexDirection: 'column'
    },
    li:{
      overflow:'hidden',
      paddingTop: '8px',
      borderBottom: '1px solid',
      width: '100%',
      //flex:1
    },
    rt:{
      float:'right',
      textAlign:'right'
    },
    hhow:{
      width: '80%',
      float:'right'
    }
  },
  vote:{
    float:'right'
  },
  sum:{
    div:{
      padding: '1px',
      width: '100%'
    },
    how:{
      float:'left',
      width:'75%',
      padding:'1px'
    }
  }
}
// const styles = theme => ({
//   root:{
//     width:'100%'
//   },
//   troot: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 300,
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 120,
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(14),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
// });