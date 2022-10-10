import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Itens from './pages/Itens'
import Clients from './pages/Clients'
import Emprestimos from './pages/Emprestimos'
import RealizarEmprestimos from './pages/RealizarEmprestimo'
import HistoricoEmprestimoCliente from './pages/HistoricoEmprestimoCliente'
import HistoricoEmprestimoProduto from './pages/HistoricoEmprestimoProduto'
import EmprestimosAtivos from './pages/EmprestimosAtivos'
import EmprestimosAtrasados from './pages/EmprestimosAtrasados'

export default function RouteApps(props) {
    return (
        <Routes>
            <Route path="/" element={<Itens />} />
            <Route exact path="/itens" element={<Itens />} />
            <Route exact path="/clientes" element={<Clients />} />
            <Route exact path="/emprestimos" element={<Emprestimos />} />
            <Route exact path="/fazeremprestimo" element={<RealizarEmprestimos />} />
            <Route exact path="/clientes/:cliente" element={<HistoricoEmprestimoCliente />} />
            <Route exact path="/itens/:produto" element={<HistoricoEmprestimoProduto />} />
            <Route exact path="/ativos" element={<EmprestimosAtivos/>} />
            <Route exact path="/emprestados" element={<EmprestimosAtivos/>} />
            <Route exact path="/atrasados" element={<EmprestimosAtrasados/>} />
        </Routes>
    )
}
