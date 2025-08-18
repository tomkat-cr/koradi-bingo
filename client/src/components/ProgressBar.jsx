import React from 'react'

export default function ProgressBar({ current, min, max }){
  const pct = Math.min(100, Math.round((current / max) * 100))
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
        <small>Meta: ${min.toLocaleString('es-CO')} – ${max.toLocaleString('es-CO')} COP</small>
        <strong>${current.toLocaleString('es-CO')} COP</strong>
      </div>
      <div style={{background:'#E2E8F0',borderRadius:12,height:14,overflow:'hidden'}}>
        <div style={{width:`${pct}%`,height:'100%',background:'var(--primary)'}} />
      </div>
    </div>
  )
}
