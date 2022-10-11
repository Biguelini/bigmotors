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
        }).then(function (response){
            alert('Produto devolvido')
        }).catch(function(e){
            alert('Algo deu errado')
            return console.log(e)
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
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {emprestimos?.map((emprestimo) => (
                        <tr key={emprestimo.id}>
                            <td>{emprestimo.idCliente}</td>
                            <td>{emprestimo.idProduto}</td>
                            <td>{emprestimo.dataEmprestimo?.split('T')[0]
                                    .split('-')
                                    .reverse()
                                    .join('/')}</td>
                            <td>{emprestimo.dataPrevDevolucao?.split('T')[0]
                                    .split('-')
                                    .reverse()
                                    .join('/')}</td>
                            <td>
                                {emprestimo.dataDevolucao ===
                                '1900-01-01T00:00:00.000Z'
                                    ? 'emprestado'
                                    : emprestimo.dataDevolucao?.split('T')[0]
                                    .split('-')
                                    .reverse()
                                    .join('/')}
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
                    ))}
                </tbody>
            </table>
        </div>
    )
}
