import React from 'react'
import logo from '../assets/koradi-logo.png'

export default function Header({ onNavigate }){
  return (
    <header className="header">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={logo} alt="Koradi" height={40} />
        <strong>Arte que Sana</strong>
      </div>
      <nav style={{display:'flex',gap:8}}>
        <button className="btn btn-outline" onClick={()=>onNavigate('landing')}>Inicio</button>
        <button className="btn btn-primary" onClick={()=>onNavigate('bingo')}>Ir al Bingo</button>
        <button className="btn btn-outline" onClick={()=>onNavigate('admin')}>Staff</button>
      </nav>
    </header>
  )
}
