import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Landing from './components/Landing.jsx'
import BingoPage from './components/BingoPage.jsx'
import AdminPanel from './components/AdminPanel.jsx'

export default function App(){
  const [view, setView] = useState('landing') // 'landing' | 'bingo' | 'admin'
  return (
    <>
      <Header onNavigate={setView} />
      <div className="container">
        {view === 'landing' && <Landing onGoBingo={()=>setView('bingo')} />}
        {view === 'bingo' && <BingoPage />}
        {view === 'admin' && <AdminPanel />}
      </div>
    </>
  )
}
