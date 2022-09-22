import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Clients.css'
export default function Clients(props) {
    const [clients, setClients] = useState([''])
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const getClients = () => {
        axios.get('http://localhost:3030/clientes').then(function (response) {
            console.log(response.data.allClients)
            setClients(response.data.allClients)
        })
    }
    const cadastrar = () => {
        console.log(nome, cpf, telefone)
        axios
            .post('http://localhost:3030/clientes', {
                nome: nome,
                cpf: cpf,
                telefone: telefone,
            })
            .then(function (response) {
                console.log(response)
            })
    }
    const deletar = (clientCpf) => {
        console.log(clientCpf)
        axios
            .post('http://localhost:3030/clientesDelete', {
                cpf: clientCpf,
            })
            .then(function (response) {
                console.log(response)
            })
    }
    useEffect(() => {
        getClients()
    }, [clients])
    const changeName = (e) => {
        setNome(e.target.value)
    }
    const changeCpf = (e) => {
        setCpf(e.target.value)
    }
    const changeTelefone = (e) => {
        setTelefone(e.target.value)
    }
    return (
        <div className="clients">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>CPF</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.nome}</td>
                            <td>{client.telefone}</td>
                            <td>{client.cpf}</td>

                            <td>
                                <button
                                    onClick={() => {
                                        deletar(client.cpf)
                                    }}
                                >
                                    Deletar
                                </button>
                                <button>Atualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form>
                <label>Nome</label>
                <input type="text" value={nome} onChange={changeName} />
                <label>CPF</label>
                <input type="text" value={cpf} onChange={changeCpf} />
                <label>Telefone</label>
                <input type="text" value={telefone} onChange={changeTelefone} />
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
