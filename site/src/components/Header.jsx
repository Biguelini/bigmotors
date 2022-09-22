import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
export default function Header(props) {
    const navigate = useNavigate()
    const goTo = (location) => {
        return navigate(location)
    }
    return (
        <header>
            <h1 className="logo">BigMotors</h1>
            <ul className="nav">
                <li onClick={()=>{goTo('/itens')}}>Itens</li>
                <li onClick={()=>{goTo('/emprestimos')}}>Empréstimos</li>
                <li onClick={()=>{goTo('/clientes')}}>Clientes</li>
                <li onClick={()=>{goTo('/fazeremprestimo')}}>Realizar empréstimo</li>
            </ul>
        </header>
    )
}
