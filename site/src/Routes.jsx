import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Itens from './pages/Itens'
import Clients from './pages/Clients'

export default function RouteApps(props) {
    return (
        <Routes>
            <Route path="/" element={<Itens />} />
            <Route exact path="/itens" element={<Itens />} />
            <Route exact path="/clientes" element={<Clients />} />
        </Routes>
    )
}
