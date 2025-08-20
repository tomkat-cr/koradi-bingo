import React, { useEffect, useState } from 'react'

import { getProgress, createCheckout } from '../api.js'
import ProgressBar from './ProgressBar.jsx'
import { isBoldEnabled, createSaleInstance, boldDefaultCurrency } from "../utilities/boldPayments.jsx"
import { newOrderId } from "../utilities/orders.jsx"
import { debug, getQueryParams } from "../utilities/utilities.jsx"

import logo from '../assets/koradi-logo.png'

const bingoPrice = import.meta.env.VITE_BINGO_PRICE || 0
const selfUrl = window.location.protocol + '//' + window.location.host

if (debug) {
  console.log('boldDefaultCurrency', boldDefaultCurrency)
  console.log('bingoPrice', bingoPrice)
  console.log('debug', debug)
}

const SaleDescription = 'BINGO de Donación'
const extraData1 = ''
const extraData2 = ''

export default function Landing({
  onGoBingo,
  viewType,
  form,
  setForm,
  orderId,
  setOrderId,
}){
  const [progress, setProgress] = useState({ total:0, goalMin:21100000, goalMax:24100000 })
  const [loading, setLoading] = useState(false)
  
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validateForm = ( amountMandatory ) => {
    if(!form.name || !form.email || !form.documentType || !form.documentNumber) {
      alert('Nombre, correo, tipo de documento y número de documento son obligatorios')
      return false
    }
    if (amountMandatory && !form.amount) {
      alert('Monto es obligatorio')
      return false
    }
    return true
  }

  const stripeCheckout = async ( checkoutType ) => {
    if (checkoutType === 'donation') {      
      try{
        const amount = Number(form.amount)
        const { url } = await createCheckout({ ...form, type: 'donation', amount: amount, paymentProvider: 'stripe', orderId: orderId })
        resetSelfUrl(url)
      } catch(err) {
        alert('Donation error: ' + err.message)
      } finally{
        setLoading(false)
      }
    } else {
      try{
        const { url } = await createCheckout({ ...form, type:'card', paymentProvider: 'stripe', orderId: orderId })
        resetSelfUrl(url)
      } catch(err) {
        alert('Card error: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const boldCheckout = async ( amount, isCard )=>{
    const purchaseData = {
      email: form.email,
      fullName: form.name,
      phone: form.phone,
      documentType: form.documentType,
      documentNumber: form.documentNumber,
      currency: boldDefaultCurrency,
      amount: Number(amount),
      // tax: 'vat-19',
      tax: 'consumption',
      description: SaleDescription,
      originUrl: selfUrl,
      redirectionUrl: selfUrl + '/donation_result',
      orderId,
      extraData1,
      extraData2
    }
    localStorage.setItem('lastOrder', JSON.stringify({ ...purchaseData, isCard }))
    if (debug) {
      console.log('purchaseData', purchaseData)
    }
    createSaleInstance(purchaseData)
    .then(checkout => {
      checkout.open()
    })
    .catch(err => {
      alert('Bold error: ' + err.message)
    })
    .finally(()=>{
      setLoading(false)
    })
  }
  
  const checkBoldResult = async () => {
    // Check if URL has #donation_result
    if (viewType === 'donation_result') {
      const lastOrder = JSON.parse(localStorage.getItem('lastOrder'))
      const urlParams = getQueryParams()
      if (debug) console.log('urlParams', urlParams)
      const boldOrderId = urlParams['bold-order-id'] || urlParams['stripe-order-id']
      const boldTxStatus = urlParams['bold-tx-status'] || urlParams['stripe-tx-status']
      if (debug) console.log('Donation result: ' + boldOrderId + ' ' + boldTxStatus)
      if (!boldOrderId || !boldTxStatus) {
        alert('Donation result Error: ' + boldOrderId + ' ' + boldTxStatus)
        resetSelfUrl()
        return
      }
      if (boldOrderId !== lastOrder.orderId) {
        alert('Donation result Error: Order ID does not match')
        resetSelfUrl()
        return
      }
      if (boldTxStatus !== 'approved') {
        alert('Donación fallida')
        resetSelfUrl()
        return
      }
      try{
        const amount = Number(lastOrder.amount)
        const { url } = await createCheckout({
          email: lastOrder.email,
          name: lastOrder.fullName,
          phone: lastOrder.phone,
          documentType: lastOrder.documentType,
          documentNumber: lastOrder.documentNumber,
          type: lastOrder.isCard ? 'card' : 'donation',
          amount: lastOrder.amount,
          currency: lastOrder.currency,
          paymentProvider: 'bold',
          orderId: lastOrder.orderId
        })
        if (url === 'bold_ok') {
          alert('Donación exitosa')
          resetSelfUrl()
        } else if (url.startsWith('http')) {
          resetSelfUrl(url)
        } else {
          console.log('Donation error # 1. URL result: ' + url)
          alert('Donación fallida. Intente nuevamente.')
        }
      } catch(err) {
        console.log('Donation error # 2: ' + err.message)
        alert('Donación fallida. Intente nuevamente.')
      } finally{
        setOrderId(newOrderId())
      }
    }    
  }

  const buyCard = async ()=>{
    if (!validateForm(false)) return
    setLoading(true)
    if (isBoldEnabled) {
      boldCheckout(bingoPrice, true)
    } else {
      stripeCheckout('card')
    }
  }

  const donate = async ()=>{
    if (!validateForm(true)) return
    setLoading(true)
    if (isBoldEnabled) {
      boldCheckout(form.amount, false)
    } else {
      stripeCheckout('donation')
    }
  }
  
  const resetSelfUrl = (url) => {
    if (url) window.location.href = url
    else window.location.href = selfUrl
  }

  useEffect( () => {
    (async()=>{
      try{
        setProgress(await getProgress())
      } catch(err){
        //
      }
    })()
  },[])

  useEffect( () => {
    (async()=>{
      if (isBoldEnabled) {
        checkBoldResult()
      }
    })()
  },[])

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
          <input name="name" placeholder="Tu nombre" required value={form.name} onChange={update} />
          <select name="documentType" required value={form.documentType} onChange={update}>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="PA">Pasaporte</option>
            <option value="RC">Registro Civil</option>
            <option value="OT">Otro</option>
          </select>
          <input name="documentNumber" placeholder="Tu Cédula" required value={form.documentNumber} onChange={update} />
          <input name="email" placeholder="Tu correo" required value={form.email} onChange={update} />
          <input name="phone" placeholder="Celular (opcional)" required value={form.phone} onChange={update} />
          <input name="amount" placeholder={"Monto en " + boldDefaultCurrency} required value={form.amount} onChange={update} />
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
