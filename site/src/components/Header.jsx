import React from 'react'
import './Header.css'
export default function Header(props) {
    return (
        <header>
            <h1 className='logo'>BigMotors</h1>
            <ul className='nav'>
                <li>Dashboard</li>
                <li>Clientes</li>
                <li>Empréstimos</li>
                <li>Itens</li>
                <li>Realizar empréstimo</li>
            </ul>
        </header>
    )
}
