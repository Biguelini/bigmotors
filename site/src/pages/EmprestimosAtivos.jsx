import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Emprestimos.css'
export default function Emprestimos(props) {
    const [emprestimos, setEmpretsimos] = useState([''])
    const getEmprestimos = () => {
        axios
            .get('http://localhost:3030/emprestimos')
            .then(function (response) {
                setEmpretsimos(response.data.allEmprestimos)
            })
    }
    useEffect(() => {
        getEmprestimos()
    }, [emprestimos])

    const devolver = (idEmprestimo) => {
        axios.post('http://localhost:3030/devolver', {
            idEmprestimo,
        })
    }
    return (
        <div className="emprestimos">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Produto</th>
                        <th>Data do empréstimo</th>
                        <th>Previsão da devolução</th>
                        <th>Data da devolução</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {emprestimos.map((emprestimo) => (
                        <>
                            {emprestimo.dataDevolucao ===
                            '1900-01-01T00:00:00.000Z' ? (
                                <tr key={emprestimo.id}>
                                    <td>{emprestimo.idCliente}</td>
                                    <td>{emprestimo.idProduto}</td>
                                    <td>{emprestimo.dataEmprestimo}</td>
                                    <td>{emprestimo.dataPrevDevolucao}</td>
                                    <td>
                                        {emprestimo.dataDevolucao ===
                                        '1900-01-01T00:00:00.000Z'
                                            ? ''
                                            : emprestimo.dataDevolucao}
                                    </td>
                                    <td>
                                        {emprestimo.dataDevolucao ===
                                        '1900-01-01T00:00:00.000Z'
                                            ? 'emprestado'
                                            : 'devolvido'}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                devolver(emprestimo.id)
                                            }}
                                        >
                                            Devolver
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
