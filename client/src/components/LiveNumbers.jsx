    import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000').replace('http','ws')

export default function LiveNumbers(){
  const [drawn, setDrawn] = useState([])
  const [last, setLast] = useState(null)

  useEffect(()=>{
    const socket = io(SOCKET_URL, { transports:['websocket'] })
    socket.on('number:drawn', ({ number, drawn })=>{ setLast(number); setDrawn(drawn) })
    socket.on('draw:reset', ()=>{ setDrawn([]); setLast(null) })
    return ()=>socket.disconnect()
  },[])

  return (
    <div className="card" style={{padding:16}}>
      <h3>Números cantados</h3>
      {last && <p>Último: <strong>{last}</strong></p>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(10,1fr)',gap:6}}>
        {Array.from({length:75},(_,i)=>i+1).map(n=>
          <div key={n} className="badge" style={{opacity: drawn.includes(n)?1:.25}}>{n}</div>
        )}
      </div>
    </div>
  )
}
