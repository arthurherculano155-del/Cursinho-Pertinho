import React from 'react';
import Home from './Pages/Home/Home.jsx'
import Possibilidades from './Pages/Possibilidades/possibilidades.jsx';
import ExplorarCursos from './Pages/Cursos/cursos.jsx';
import Sobre from './Pages/Sobre/sobre.jsx';
import NotFound from './Pages/NotFound/notfound.jsx';
import PostarCursos from './Pages/Dashboard/Postar-Curso/Postar.jsx';
import Usuarios from './Pages/Dashboard/Usuarios/usuarios.jsx';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function Rotas() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/possibilidades' element={<Possibilidades />} />
                    <Route path='/explorar-cursos' element={<ExplorarCursos />} />
                    <Route path='/sobre' element={<Sobre />} />

                    <Route path='/dashboard/ofertas' element={<PostarCursos />} />
                    <Route path='/dashboard/usuarios' element={<Usuarios />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}