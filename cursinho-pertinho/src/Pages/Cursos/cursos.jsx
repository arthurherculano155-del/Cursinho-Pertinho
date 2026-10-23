import './cursos.scss';

import { useLocation } from 'react-router-dom';

import Menu from '../../Components/Shared/Menu/menu.jsx';
import CardOferta from '../../Components/Shared/Card-Oferta/cardOferta.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';

export default function ExplorarCursos() {
    const location = useLocation();

    const cursosGratuitos = location.state?.cursosGratuitos ?? false;
    const cursosPesquisa = location.state?.cursosPesquisa ?? "";

    return (
        <>
            <Menu />

            <HeroSection
                imagem="Menina-Estudo.png"
                titulo="Os melhores cursos estão"
                tituloSpan="pertinho de você"
                mensagem="Encontre cursos de qualidade na sua região e conquiste novas habilidades para se destacar no"
                mensagemDeBaixo="mercado de trabalho, realizar seus sonhos e abrir portas para novas oportunidades"
            />

            <CardOferta
                key={cursosPesquisa}
                cursoGratuito={cursosGratuitos}
                cursosPesquisa={cursosPesquisa}
            />

            <Rodape />
        </>
    )
}