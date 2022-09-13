import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'

export default function RouteApps(props) {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
        </Routes>
    )
}
