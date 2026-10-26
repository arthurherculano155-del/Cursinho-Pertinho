import './sobre.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';

export default function Sobre() {
    return (
        <>
            <Menu />

            <HeroSection
                imagem="Estudantes.png"
                titulo="Conectamos pessoas a "
                tituloSpan="novas oportunidades"
                mensagem="O Cursinho Pertinho facilita o acesso à informação sobre cursos e caminhos de formação "
                mensagemDeBaixo="para que cada pessoa possa construir seu futuro. O Cursinho Pertinho facilita a busca por cursos de diferentes áreas, reunindo informações sobre instituições, modalidades, níveis de ensino, preços e localização em um só lugar"
                conhecerProjeto={true}
            />

            <div>
                <h2 className='quem'>Quem Somos</h2>
                <div className='quemsomos'>
                    <p className='frase'>Somos uma plataforma que ajuda você a descobrir <br /> cursos, oportunidadese caminhos
                        de formação de <br /> acordo com a região, modalidade, nível, instituição <br /> e preço. Tudo em um só lugar, de forma simples <br /> e segura.
                    </p>
                    <img className='mapa' src="/Assets/Imgs/mapa.webp" alt="mapa" />
                </div>
            </div>

            <div className='container-cards'>
                <div className='cards'>
                    <h3 className='card1'>Aproximar Oportunidades</h3>
                    <i className='fa-solid fa-crosshairs' />
                    <p className='cardp'>Conectamos você a cursos e instituições <br />que fazem sentido para o seu momento e <br /> para os seus objetivos.</p>

                </div>
                <div className='cards'>
                    <h4 className='card2'>Informação Acessível</h4>
                    <i class="fa-regular fa-file-lines" />
                    <p className='cardp2'>Reunimos em um só lugar dados claros e atualizados para você comparar e escolher com mais segurança.</p>
                </div>

                <div className='cards'>
                    <h5 className='card3'>Apoiar escolhas</h5>
                    <i className="fa-solid fa-user" />
                    <p className='cardp3'>Acreditamos no seu potencial e <br /> trabalhamos para que você encontre <br />o curso ideal para o seu futuro.</p>

                </div>
            </div>

            <div className='missao'>
                <i class="fa-solid fa-paper-plane" />
                <h6 className='Nossa-Missão'>Nossa missão</h6>
                <p className='frase1'>Tornar a busca por formação mais simples, clara e próxima da realidade de cada pessoa.</p>

            </div>

            <div className='valorizamos'>
                <h6 className='valor'>O que valorizamos</h6>

                <div className='ateo'>
                    <i class="fa-brands fa-accessible-icon"></i>
                   <div className='texto'>
                    <h1 className='acess'>Acessibilidade</h1>
                    <p className='text1'>Educação de qualidade <br /> para todos</p>
                    </div>
                </div>

                <div className='ateo'>
                    <i class="fa-solid fa-shield"></i>
                    <div className='texto'>
                    <h2 className='shield'>Transparência</h2>
                    <p className='text2'>Informações confiáveis <br /> e atualizados</p>
                    </div>
                </div>
                    
                    <div className='ateo'>
                    <i class="fa-solid fa-graduation-cap"></i>
                    <div className='texto'>
                    <h3 className='edu'>Educação</h3>
                    <p className='text3'>Mais do que cursos, <br />formamos futuros</p>
                    </div>
                    </div>

                    <div className='ateo'>
                    <i class="fa-solid fa-star" ></i>

                    <div className='texto'>
                    <h4 className='op'>Oportunidade</h4>
                    <p className='text4'>Porque todo mundo <br />merece uma chance</p>
                    </div>
                </div>



            </div>

            <Rodape />


        </>

    )
}