    import React, { useState } from 'react'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export default function AdminPanel(){
  const [next, setNext] = useState(null)
  const drawNext = async ()=>{
    const r = await fetch(`${BASE}/api/admin/draw/next`,{ method:'POST' })
    const data = await r.json(); setNext(data.next)
  }
  const reset = async ()=>{ await fetch(`${BASE}/api/admin/draw/reset`,{ method:'POST' }); setNext(null) }
  return (
    <div className="card" style={{padding:16}}>
      <h2>Panel Staff</h2>
      <p>Desde aquí el equipo puede cantar números y reiniciar el sorteo.</p>
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-primary" onClick={drawNext}>Cantar siguiente</button>
        <button className="btn btn-outline" onClick={reset}>Reiniciar</button>
      </div>
      {next && <p>Último cantado: <strong>{next}</strong></p>}
    </div>
  )
}
