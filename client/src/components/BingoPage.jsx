    import React, { useState } from 'react'
import { fetchMyCard, claimBingo } from '../api.js'
import BingoCard from './BingoCard.jsx'
import LiveNumbers from './LiveNumbers.jsx'

export default function BingoPage(){
  const [email, setEmail] = useState('')
  const [card, setCard] = useState(null)
  const [status, setStatus] = useState('')

  const loadCard = async ()=>{
    try{
      const { card } = await fetchMyCard(email)
      setCard(card); setStatus('¡Cartón cargado!')
    }catch(e){ setStatus(e.message) }
  }

  const onClaim = async ()=>{
    try{
      const { winner } = await claimBingo(email)
      alert(winner ? '¡BINGO validado! El equipo te contactará.' : 'Aún no es BINGO. ¡Sigue jugando!')
    }catch(e){ alert(e.message) }
  }

  return (
    <section style={{display:'grid',gap:16}}>
      <div className="card" style={{padding:16}}>
        <h2>Transmisión en vivo</h2>
        <div style={{position:'relative',paddingTop:'56.25%'}}>
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=UCxxxxxxxx"
            title="Koradi en Vivo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{position:'absolute',inset:0,border:0,width:'100%',height:'100%'}}
          />
        </div>
      </div>

      <div className="card" style={{padding:16}}>
        <h2>Tu cartón</h2>
        <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
          <input placeholder="Tu correo (usado en la compra)" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="btn btn-primary" onClick={loadCard}>Cargar</button>
          <span>{status}</span>
        </div>
        <BingoCard card={card} />
        <div style={{marginTop:12}}>
          <button className="btn btn-outline" onClick={onClaim}>¡BINGO!</button>
        </div>
      </div>

      <LiveNumbers />
    </section>
  )
}
