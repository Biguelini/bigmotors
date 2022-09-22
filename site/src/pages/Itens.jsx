import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Itens.css'
export default function Itens(props) {
    const [produtos, setProdutos] = useState([''])
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [imagem, setImagem] = useState('')
    const getProdutos = () => {
        axios.get('http://localhost:3030/produtos').then(function (response) {
            setProdutos(response.data.allProducts)
        })
    }
    const cadastrar = () => {
        console.log(nome, preco, imagem)
        axios
            .post('http://localhost:3030/produtos', {
                nome: nome,
                preco: parseFloat(preco),
                imagem: imagem,
            })
            .then(function (response) {
                console.log(response)
            })
    }
    const deletar = (itenId) => {
        console.log(itenId)
        axios
            .post('http://localhost:3030/produtosDelete', {
                id: itenId,
            })
            .then(function (response) {
                console.log(response)
            })
    }
    useEffect(() => {
        getProdutos()
    }, [produtos])
    const changeName = (e) => {
        setNome(e.target.value)
    }
    const changePreco = (e) => {
        setPreco(e.target.value)
    }
    const changeImagem = (e) => {
        setImagem(e.target.value)
    }
    return (
        <div className="produtos">
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
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.imagem}</td>

                            <td>
                                <button
                                    onClick={() => {
                                        deletar(produto.id)
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
                <label>Preço</label>
                <input type="number" value={preco} onChange={changePreco} />
                <label>Imagem</label>
                <input type="text" value={imagem} onChange={changeImagem} />
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
