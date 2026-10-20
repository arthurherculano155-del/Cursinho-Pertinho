import './sobre.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';

export default function Sobre(){
    return(
        <>
        <Menu />
        
        <HeroSection
            imagem="Estudantes.png"
            titulo="Conectamos pessoas a "
            tituloSpan="novas oportunidades"
            mensagem="O Cursinho Pertinho facilita o acesso à informação sobre cursos e caminhos de formação"
            mensagemDeBaixo="para que cada pessoa possa construir seu futuro"
        />
        </>
    )
}