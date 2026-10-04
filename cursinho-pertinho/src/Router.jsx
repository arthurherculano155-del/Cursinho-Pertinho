import React from 'react';
import Home from './Pages/Home/Home.jsx'
import PostarCursos from './Pages/Dashboard/Postar-Curso/Postar.jsx';
import Usuarios from './Pages/Dashboard/Usuarios/usuarios.jsx';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function Rotas() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard/ofertas' element={<PostarCursos />} />
                    <Route path='/dashboard/usuarios' element={<Usuarios />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}