import React, { useEffect, useState } from 'react'
import { getProgress, createCheckout } from '../api.js'
import ProgressBar from './ProgressBar.jsx'
import logo from '../assets/koradi-logo.png'

export default function Landing({ onGoBingo }){
  const [progress, setProgress] = useState({ total:0, goalMin:21100000, goalMax:24100000 })
  const [form, setForm] = useState({ email:'', name:'', phone:'', amount:'' })
  const [loading, setLoading] = useState(false)
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })

  useEffect(()=>{ (async()=>{ try{ setProgress(await getProgress()) }catch{} })() },[])

  const buyCard = async ()=>{
    if(!form.email) return alert('Ingresa tu correo')
    setLoading(true)
    try{
      const { url } = await createCheckout({ ...form, type:'card' })
      window.location.href = url
    }catch(err){ alert(err.message) } finally{ setLoading(false) }
  }

  const donate = async ()=>{
    if(!form.email || !form.amount) return alert('Correo y monto son obligatorios')
    setLoading(true)
    try{
      const amount = Number(form.amount)
      const { url } = await createCheckout({ ...form, type:'donation', amount })
      window.location.href = url
    }catch(err){ alert(err.message) } finally{ setLoading(false) }
  }

  return (
    <section className="hero">
      <div>
        <h1 style={{marginTop:0}}>Bingo Solidario – <span style={{color:'var(--primary)'}}>Arte que Sana</span></h1>
        <p>Apoyemos a 25 jóvenes en rehabilitación. Tu aporte mejora su hogar: cocina digna, techos seguros y materiales para su proceso terapéutico.</p>
        <ProgressBar current={progress.total} min={progress.goalMin} max={progress.goalMax} />

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:16}}>
          <button className="btn btn-primary" onClick={buyCard} disabled={loading}>Comprar Cartón de Bingo</button>
          <button className="btn btn-outline" onClick={onGoBingo}>Entrar al Bingo</button>
        </div>

        <h3 style={{marginTop:24}}>O dona el monto que elijas</h3>
        <div style={{display:'grid',gap:8,maxWidth:480}}>
          <input name="name" placeholder="Tu nombre" value={form.name} onChange={update} />
          <input name="email" placeholder="Tu correo" value={form.email} onChange={update} />
          <input name="phone" placeholder="Celular (opcional)" value={form.phone} onChange={update} />
          <input name="amount" placeholder="Monto en COP" value={form.amount} onChange={update} />
          <button className="btn btn-primary" onClick={donate} disabled={loading}>Donar ahora</button>
        </div>
      </div>
      <div>
        <div className="logo">
          <img src={logo} width={420} alt="Koradi Logo" />
        </div>
        <div className="card">
          <h3>Necesidades urgentes</h3>
          <ul>
            <li>Cambio de techo en salas principales</li>
            <li>Transición de cocina de leña a cocina segura</li>
            <li>Materiales para talleres de arte terapéutico</li>
          </ul>
          <p style={{fontStyle:'italic'}}>Tu ayuda suma. Cada cartón es una oportunidad de transformar vidas.</p>
        </div>
      </div>
    </section>
  )
}
