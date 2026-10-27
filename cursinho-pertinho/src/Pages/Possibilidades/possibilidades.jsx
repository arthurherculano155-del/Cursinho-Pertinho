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
            mensagem="Descubra seus interesses, explore novos caminhos de aprendizado e encontre"
            mensagemDeBaixo="novas oportunidades para aprender, desenvolver habilidades e crescer pessoalmente e profissionalmente"
            botoes={true}
        />
       <div className="comecar">
      <h2>Por onde você quer começar?</h2>
      <p>
        Explore cursos da sua região. Explore o que faz sentido para você.
      </p>
    </div>
        </>
    )
}