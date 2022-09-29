import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './RealizarEmprestimo.css'
export default function RealizarEmprestimos(props) {
    const [idCliente, setIdCliente] = useState('')
    const [idProduto, setIdProduto] = useState('')
    const [dataPrevDevolucao, setDataPrevDevolucao] = useState('')
    const [clients, setClients] = useState([''])
    const [produtos, setProdutos] = useState([''])
    const getProdutos = () => {
        axios.get('http://localhost:3030/produtos').then(function (response) {
            setProdutos(response.data.allProducts)
        })
    }
    const getClients = () => {
        axios.get('http://localhost:3030/clientes').then(function (response) {
            console.log(response.data.allClients)
            setClients(response.data.allClients)
        })
    }
    useEffect(() => {
        getClients()
        getProdutos()
    }, [])
    const changeIdCliente = (e) => {
        setIdCliente(e.target.value)
    }
    const changeIdProduto = (e) => {
        setIdProduto(e.target.value)
    }
    const changeDataPrevDevolucao = (e) => {
        setDataPrevDevolucao(e.target.value)
    }
    const cadastrar = () => {
        console.log(idCliente, idProduto, dataPrevDevolucao)
        axios
            .post('http://localhost:3030/emprestimos', {
                idCliente,
                idProduto,
                dataPrevDevolucao,
            })
            .then(function (response) {
                console.log(response)
            })
    }
    return (
        <div className="emprestimosform">
            <form>
                <label>Cliente</label>
                <select name="clientes" id="" onChange={changeIdCliente}>
                    {clients.map((cliente) => (
                        <option  value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
                <label>Produto</label>
                <select name="produtos" id="" onChange={changeIdProduto}>
                    {produtos.map((produto) => (
                        <option  value={produto.id}>
                            {produto.nome}
                        </option>
                    ))}
                </select>
                <label>Previsão de devolução</label>

                <input
                    type="date"
                    value={dataPrevDevolucao}
                    onChange={changeDataPrevDevolucao}
                />
            </form>
            <button
                onClick={() => {
                    cadastrar()
                }}
            >
                Enviar
            </button>
        </div>
    )
}
