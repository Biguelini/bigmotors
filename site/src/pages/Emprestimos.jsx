import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Emprestimos.css'
export default function Emprestimos(props) {
    const [emprestimos, setEmpretsimos] = useState([''])
    const getEmprestimos = () => {
        axios.get('http://localhost:3030/emprestimos').then(function (response) {
            setEmpretsimos(response.data.allEmprestimos)
            console.log(response.data)
        })
    }
    useEffect(() => {
        getEmprestimos()
    }, [])

    return (
        <div className="produtos">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>IdCliente</th>
                        <th>IdProduto</th>
                        <th>Data de Emprestimo</th>
                        <th>Data Previsão de Devolução</th>
                        <th>Data de Devolução</th>
                    </tr>
                </thead>
                <tbody>
                    {emprestimos.map((emprestimo) => (
                        <tr key={emprestimo.id}>
                            <td>{emprestimo.idCliente}</td>
                            <td>{emprestimo.idProduto}</td>
                            <td>{emprestimo.dataEmprestimo}</td>
                            <td>{emprestimo.dataPrevDevolucao}</td>
                            <td>{emprestimo.dataDevolucao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}
