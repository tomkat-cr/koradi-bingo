import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header.jsx'
import Landing from './components/Landing.jsx'
import BingoPage from './components/BingoPage.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import { newOrderId } from "./utilities/orders.jsx"
import { initBoldCheckout, isBoldEnabled } from './utilities/boldPayments.jsx'

export default function App() {
  const [form, setForm] = useState({ email: '', name: '', phone: '', documentType: 'CC', documentNumber: '', amount: '' })
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    if (isBoldEnabled) initBoldCheckout()
  }, [])

  useEffect( () => {
    if (orderId === '') setOrderId(newOrderId())
  },[])

  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Landing onGoBingo={() => window.location.href = '/bingo'} viewType="landing" form={form} setForm={setForm} orderId={orderId} setOrderId={setOrderId} />} />
            <Route path="/donation_result" element={<Landing onGoBingo={() => window.location.href = '/bingo'} viewType="donation_result" form={form} setForm={setForm} orderId={orderId} setOrderId={setOrderId} />} />
            <Route path="/bingo" element={<BingoPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}
