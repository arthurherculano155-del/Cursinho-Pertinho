import './possibilidades.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';


export default function Possibilidades(){
    return(
        <>
        <Menu />

        <HeroSection 
            imagem="Horizonte.webp"
            titulo="Seu futuro tem "
            tituloSpan="muitas possibilidades"
            mensagem="Descubra seus interesses, explore novos caminhos e encontre"
            mensagemDeBaixo="oportunidades para aprender e crescer"
            botoes={true}
        />
        </>
    )
}