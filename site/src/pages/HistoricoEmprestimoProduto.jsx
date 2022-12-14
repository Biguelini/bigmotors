import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Emprestimos.css'
export default function Emprestimos(props) {
    const [historico, setHistorico] = useState([''])
    const { produto } = useParams()
    const getHistorico = () => {
        axios
            .post('http://localhost:3030/produtoEmprestado', {
                idProduto: produto,
            })
            .then(function (response) {
                setHistorico(response.data)
            })
    }
    useEffect(() => {
        getHistorico()
    }, [])

    return (
        <div className="emprestimos">
                        <h1>Histórico carro</h1>

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Produto</th>
                        <th>Data do empréstimo</th>
                        <th>Previsão da devolução</th>
                        <th>Data da devolução</th>
                    </tr>
                </thead>
                <tbody>
                    {historico.map((emprestimo) => (
                        <tr key={emprestimo.id}>
                            <td>{emprestimo.idCliente}</td>
                            <td>{emprestimo.idProduto}</td>
                            <td>
                                {emprestimo.dataEmprestimo
                                    ?.split('T')[0]
                                    .split('-')
                                    .reverse()
                                    .join('/')}
                            </td>
                            <td>
                                {emprestimo.dataPrevDevolucao
                                    ?.split('T')[0]
                                    .split('-')
                                    .reverse()
                                    .join('/')}
                            </td>
                            <td>
                                {emprestimo.dataDevolucao ===
                                '1900-01-01T00:00:00.000Z'
                                    ? 'emprestado'
                                    : emprestimo.dataDevolucao
                                          ?.split('T')[0]
                                          .split('-')
                                          .reverse()
                                          .join('/')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
