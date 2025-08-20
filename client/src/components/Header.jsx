import React from 'react'
import logo from '../assets/koradi-logo.png'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="header">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={logo} alt="Koradi" height={40} />
        <strong>Arte que Sana</strong>
      </div>
      <nav style={{display:'flex',gap:8}}>
        <Link className="btn btn-outline" to="/">Inicio</Link>
        <Link className="btn btn-primary" to="/bingo">Ir al Bingo</Link>
        <Link className="btn btn-outline" to="/admin">Staff</Link>
      </nav>
    </header>
  )
}
