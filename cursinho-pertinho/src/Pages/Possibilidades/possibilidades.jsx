import './possibilidades.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';
import CardTecnologia from '../../Components/PossibilitiesComponents/cardTecnologia.jsx';


export default function Possibilidades() {
    return (
        <>
            <Menu />
            <HeroSection
                imagem="Horizonte.webp"
                titulo="Seu futuro tem "
                tituloSpan="muitas possibilidades"
                mensagem="Descubra seus interesses, explore novos caminhos de aprendizado e encontre "
                mensagemDeBaixo="novas oportunidades para aprender, desenvolver habilidades e crescer pessoalmente e profissionalmente"
                botoes={true}
            />
            
            <div className='painho'>
                <div>
                    <h1 className='CONHEÇA'>CONHEÇA NOSSAS ÁREAS</h1>
                    <h2 className='construção'>DIVERSAS ÁREAS PARA <br></br>VOCÊ EXPLORAR E CONSTRUIR <br></br><b>O SEU FUTURO</b></h2>
                    <p className='suubtitulo'>Aqui no Cursinho Pertinho, você encontra um mundo de <br></br>possibilidades. Nossas áreas foram pensadas para te ajudar <br></br>a descobrir seus interesses, desenvolver suas habilidades e<br></br> se preparar para o mercado de trabalho ou para a universidade.</p>
                </div>

                <div >

                    <img src='/Assets/Imgs/estudantebigode.png' className='bigode' alt='Imagem-Estudante' />

                </div>

            </div>

            <CardTecnologia 
                icone="computer"
                titulo="Computador"
                mensagem="Exemplo"
            />

        <Rodape />
        </>
    )
}