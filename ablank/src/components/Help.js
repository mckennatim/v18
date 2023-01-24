import React,{useContext} from 'react'
import {AContext} from '../contexts/acontext'

export default function Help(){
  const {visiblePages} = useContext(AContext)
  return(
    
    <div style ={styles.help.div0}>
      {visiblePages.map((p,i)=>(<div key={i}>{p}</div>))}
      <span>
      Shares of GameStop — the company at the center of an online buying binge that captured the imagination of the world last week — crashed another 42 percent on Thursday, leaving it at a small fraction of the value it held just a few days ago.

It was the third plunge in four trading sessions for the stock, which had become the symbolic heart of an online crusade against some of Wall Street’s most sophisticated investors.

Shares of GameStop closed at $53.50, almost 90 percent below their peak of $483 on Thursday morning last week.

The video game retailer’s stock is down 84 percent this week, and the rout has convinced many who favored the stock that the ride is over.

“GME is dead,” one user, BoBo_HUST, wrote on Reddit’s WallStreetBets forum, using GameStop’s ticker symbol. Then the commenter wondered aloud about the prospects of one of the other so-called meme stocks, BlackBerry. “Can BB save us?”

BlackBerry, the once-dominant maker of mobile device
      </span>
    </div>
  )
}

const styles ={
  help:{
    div0:{
      backgroundColor: '#c7b1c9'
    }
  }
}