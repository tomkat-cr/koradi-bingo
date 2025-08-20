import React, { useState, useEffect } from 'react'
import { fetchLiveUrl } from '../api.js'
import { debug } from '../utilities/utilities.jsx'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export default function AdminPanel(){
  const [next, setNext] = useState(null)
  const [draws, setDraws] = useState(null)
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [liveUrl, setLiveUrl] = useState('')

  const verifyLogin = async (event) =>{
    event.preventDefault()
    const body = {
      "username": username,
      "password": password
    }
    const r = await fetch(`${BASE}/api/admin/login`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(body)
    })
    if(!r.ok) return alert('Credenciales inválidas')
    const data = await r.json()
    setLogin(data.ok)
  }

  const drawNext = async ()=>{
    const r = await fetch(`${BASE}/api/admin/draw/next`,{ method:'POST' })
    const data = await r.json()
    setNext(data.next)
    currentDraws()
  }

  const updateDraw = async ()=>{
    const r = await fetch(`${BASE}/api/admin/draw/update`,{ method:'POST' })
    const data = await r.json()
    setNext(data.next)
    currentDraws()
  }

  const reset = async () => {
    await fetch(`${BASE}/api/admin/draw/reset`,{ method:'POST' })
    setNext(null)
    currentDraws()
  }

  const currentDraws = async () => {
    const r = await fetch(`${BASE}/api/draw/state`,{ method:'GET' })
    const data = await r.json()
    console.log('Draws data:', data)
    setDraws(data)
  }

  const setDbLiveUrl = async () => {
    const r = await fetch(`${BASE}/api/admin/set-live-url`,{
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ url: liveUrl })
    })
    const data = await r.json()
    if(!data.ok) return alert('Error al guardar URL de transmisión')
    alert('URL de transmisión guardada')
  }

  useEffect( () => {
    if (!login) return
    currentDraws()
  },[login])

  useEffect( async () => {
    const { url } = await fetchLiveUrl()
    if (debug) console.log('Live URL received:', url.url)
    setLiveUrl(url.url)
  },[])

  return login ? (
      <>
        <div className="card">
          <h2>Panel Staff</h2>
          <p>Desde aquí el equipo puede cantar números y hacer seguimiento del sorteo.</p>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-primary" onClick={drawNext}>Cantar siguiente</button>
            <button className="btn btn-primary" onClick={updateDraw}>Actualizar Websocket</button>
          </div>
        </div>
        <div className="card">
          <h2>Sorteo actual</h2>
          {draws && <p>Números cantados: <strong>{draws.drawn.join(', ')}</strong></p>}
          {draws && <p>Último cantado: <strong>{draws.last}</strong></p>}
        </div>
        <div className="card">
          <h2>Transmisión en vivo</h2>
          <div>
            <p>
              <label>URL de transmisión:</label>
              <input type="text" value={liveUrl} onChange={(e)=>setLiveUrl(e.target.value)} />
            </p>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-primary" onClick={setDbLiveUrl}>Guardar</button>
            </div>
          </div>
        </div>
        <div className="card">
          <h2>Zona de control</h2>
          <p>Desde aquí el equipo puede reiniciar el sorteo. Tenga en cuenta que esto puede afectar a los jugadores que ya hayan comprado cartones.</p>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-outline" onClick={reset}>Reiniciar</button>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="card">
          <h2>Panel Staff</h2>
          <label className="input_usuario">Usuario: <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/></label>
          <label className="input_password">Contraseña: <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></label>
          <div className="input_actions">
            <button className="btn btn-primary" onClick={verifyLogin}>Iniciar sesión</button>
          </div>
        </div>
      </>
    )
}
