import './possibilidades.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';


export default function Possibilidades(){
    return(
        <>
        <Menu />
        <HeroSection 
            imagem="Horizonte.webp"
            titulo="Seu futuro tem "
            tituloSpan="muitas possibilidades"
            mensagem="Descubra seus interesses, explore novos caminhos de aprendizado e encontre"
            mensagemDeBaixo="novas oportunidades para aprender, desenvolver habilidades e crescer pessoalmente e profissionalmente"
            botoes={true}
        />

        <Rodape />
        </>
    )
}