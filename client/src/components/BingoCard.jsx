import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000').replace('http','ws')

const HEADERS = ['B','I','N','G','O']
const RANGES = { 0:[1,15], 1:[16,30], 2:[31,45], 3:[46,60], 4:[61,75] }

function generateLocalCard(){
  const grid = Array.from({length:5},()=>Array(5).fill(null))
  for(let c=0;c<5;c++){
    const [min,max] = RANGES[c]
    const pool = [...Array(max-min+1)].map((_,i)=>min+i).sort(()=>Math.random()-0.5)
    for(let r=0;r<5;r++){
      if(c===2 && r===2){ grid[r][c] = '★'; continue }
      grid[r][c] = pool[r]
    }
  }
  return grid
}

export default function BingoCard({ card }){
  const [drawn, setDrawn] = useState([])
  const [last, setLast] = useState(null)

  useEffect(()=>{
    const socket = io(SOCKET_URL, { transports:['websocket'] })
    socket.on('number:drawn', ({ number, drawn })=>{ setLast(number); setDrawn(drawn) })
    socket.on('draw:reset', ()=>{ setDrawn([]); setLast(null) })
    return ()=>socket.disconnect()
  },[])

  const grid = React.useMemo(()=>{
    if(card?.cells){
      const g = Array.from({length:5},()=>Array(5).fill(''))
      let idx=0
      for(let c=0;c<5;c++){
        for(let r=0;r<5;r++){
          if(c===2 && r===2){ g[r][c] = '★'; continue }
          g[r][c] = card.cells[idx++].value
        }
      }
      return g
    }
    return generateLocalCard()
  },[card])

  return (
    <div className="bingo">
      <div className="bingo-head">
        {HEADERS.map(h=> <div key={h} className="bingo-h">{h}</div>)}
      </div>
      <div className="bingo-grid">
        {grid.map((row,r)=>(
          <React.Fragment key={r}>
            {row.map((cell,c)=>{
              const isFree = (r===2 && c===2)
              return <div key={`${r}-${c}`} className={`bingo-cell ${isFree?'free':''} ${drawn.includes(cell)?'hit':''}`}>{cell}</div>
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
