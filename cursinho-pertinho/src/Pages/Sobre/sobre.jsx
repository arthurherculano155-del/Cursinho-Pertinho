import './sobre.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';

export default function Sobre() {
    return (
        <>
            <Menu />

            <HeroSection
                imagem="Estudantes.png"
                titulo="Conectamos pessoas a "
                tituloSpan="novas oportunidades"
                mensagem="O Cursinho Pertinho facilita o acesso à informação sobre cursos e caminhos de formação"
                mensagemDeBaixo="para que cada pessoa possa construir seu futuro. O Cursinho Pertinho facilita a busca por cursos de diferentes áreas, reunindo informações sobre instituições, modalidades, níveis de ensino, preços e localização em um só lugar"
                conhecerProjeto={true}
            />

            <div>
                <h2 className='quem'>Quem Somos</h2>
                <div className='quemsomos'>
                    <p className='frase'>Somos uma plataforma que ajuda você a descobrir <br /> cursos, oportunidadese caminhos
                        de formação de <br /> acordo com a região, modalidade, nível, instituição <br /> e preço. Tudo em um só lugar, de forma simples <br /> e segura.
                    </p>
                    <img className='mapa' src="/Assets/imgs/mapa.webp" alt="mapa" />
                </div>
            </div>


            <div className='cards'>
                <h3 className='card1'>Aproximar Oportunidades</h3>
                <i className='fa-solid fa-crosshairs' />
                <p className='cardp'>Conectamos você a cursos e instituições <br />que fazem sentido para o seu momento e <br /> para os seus objetivos.</p>

            </div>

        </>

    )
}