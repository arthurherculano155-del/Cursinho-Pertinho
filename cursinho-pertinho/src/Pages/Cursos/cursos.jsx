import './cursos.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import CardOferta from '../../Components/Shared/Card-Oferta/cardOferta.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';

export default function ExplorarCursos() {
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

            <CardOferta />

            <Rodape />
        </>
    )
}