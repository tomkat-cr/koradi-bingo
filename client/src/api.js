const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export async function getProgress(){
  const r = await fetch(`${BASE}/api/progress`)
  if(!r.ok) throw new Error('Error obteniendo progreso')
  return r.json()
}

export async function createCheckout({ email, name, phone, documentType, documentNumber, type, amount, currency, paymentProvider, orderId }){
  const r = await fetch(`${BASE}/api/checkout`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ email, name, phone, documentType, documentNumber, type, amount, currency, paymentProvider, orderId })
  })
  if(!r.ok) throw new Error('No se pudo crear checkout')
  return r.json()
}

export async function fetchMyCard(email){
  const r = await fetch(`${BASE}/api/my-card?email=${encodeURIComponent(email)}`)
  if(!r.ok) throw new Error('No hay cartón asignado aún')
  return r.json()
}

export async function fetchLiveUrl(){
  const r = await fetch(`${BASE}/api/live-url`)
  if(!r.ok) throw new Error('Error obteniendo URL de transmisión')
  return r.json()
}

export async function claimBingo(email){
  const r = await fetch(`${BASE}/api/claim-bingo`,{
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ email })
  })
  if(!r.ok) throw new Error('Error al reclamar BINGO')
  return r.json()
}
