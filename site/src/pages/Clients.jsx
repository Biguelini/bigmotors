import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Clients.css'
export default function Clients(props) {
    const [clients, setClients] = useState([''])
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const getClients = () => {
        axios.get('http://localhost:3030/clientes').then(function (response) {
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
                alert('Cliente cadastrado')
                setNome('')
                setCpf('')
                setTelefone('')
            }).catch(function(e){
                alert('Algo deu errado')
                return console.log(e)
            })
    }
    const deletar = (clientCpf, idCliente) => {
        console.log(clientCpf)
        axios
            .post('http://localhost:3030/clientesDelete', {
                cpf: clientCpf,
                id: idCliente,
            })
            .then(function (response) {
                alert('Cliente deletado')
            }).catch(function(e){
                alert('Algo deu errado')
                return console.log(e)
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
    const navigate = useNavigate()
    const goTo = (location) => {
        return navigate(location)
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
                        <th>Histórico</th>
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
                                        deletar(client.cpf, client.id)
                                    }}
                                >
                                    Deletar
                                </button>
                                <button>Atualizar</button>
                            </td>
                            <td><button onClick={()=>{goTo('/clientes/'+client.id.toString())}}>Ver histórico</button></td>
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
