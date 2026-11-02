import './sobre.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';
import CardInfo from '../../Components/AboutComponents/cardInfo.jsx';
import Indice from '../../Components/Shared/Indice/indice.jsx';

export default function Sobre() {
    return (
        <>
            <Menu />

            <HeroSection
                imagem="Estudantes.png"
                titulo="Conectamos pessoas a "
                tituloSpan="novas oportunidades"
                mensagem="O Cursinho Pertinho facilita o acesso à informação sobre cursos e caminhos de formação"
                mensagemDeBaixo="para que cada pessoa possa construir seu futuro. O Cursinho Pertinho facilita a busca por cursos de diferentes áreas, reunindo informações sobre instituições, modalidades, níveis de ensino, preços e localização em um só lugar."
                conhecerProjeto={true}
            />

            <main className="pagina-sobre">

                <section className="sobre-introducao" id="titulo">
                    <div className="sobre-cabecalho">
                        <Indice
                            mensagem="Conheça nossa plataforma"
                        />
                        
                        <h2 className="sobre-titulo">
                            Educação mais <span>perto de você</span>
                        </h2>

                        <p className="sobre-descricao">
                            Somos uma plataforma que ajuda você a descobrir
                            cursos, oportunidades e caminhos de formação de
                            acordo com a região, modalidade, nível, instituição
                            e preço. Tudo em um só lugar, de forma simples e
                            segura
                        </p>
                    </div>

                    <div className="sobre-visual">
                        <div className="sobre-imagem-fundo"></div>

                        <img
                            className="sobre-imagem"
                            src="/Assets/Imgs/mapa.png"
                            alt="Ilustração que representa a localização de cursos e instituições de ensino"
                        />

                        <div className="sobre-imagem-legenda">
                            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                            <span>Oportunidades perto de você</span>
                        </div>
                    </div>
                </section>

                <section className="sobre-beneficios">
                    <div className="secao-sobre-cabecalho">
                        <h2>
                            Como queremos <span>fazer a diferença?</span>
                        </h2>

                        <p>
                            Desenvolvemos uma experiência pensada para
                            facilitar sua busca e aproximar você da educação
                        </p>
                    </div>

                    <div className="beneficios-lista">
                        <article className="beneficio-card">
                            <div className="beneficio-icone azul">
                                <i className="fa-solid fa-crosshairs" aria-hidden="true"></i>
                            </div>

                            <div className="beneficio-conteudo">
                                <h3>Aproximar oportunidades</h3>
                                <p>
                                    Conectamos você a cursos e instituições que
                                    fazem sentido para o seu momento e para os
                                    seus objetivos
                                </p>
                            </div>
                        </article>

                        <article className="beneficio-card">
                            <div className="beneficio-icone ciano">
                                <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
                            </div>

                            <div className="beneficio-conteudo">
                                <h3>Informação acessível</h3>
                                <p>
                                    Reunimos em um só lugar dados claros e
                                    atualizados para você comparar e escolher
                                    com mais segurança
                                </p>
                            </div>
                        </article>

                        <article className="beneficio-card">
                            <div className="beneficio-icone verde">
                                <i className="fa-solid fa-user" aria-hidden="true"></i>
                            </div>

                            <div className="beneficio-conteudo">
                                <h3>Apoiar escolhas</h3>
                                <p>
                                    Acreditamos no seu potencial e trabalhamos
                                    para que você encontre o curso ideal para
                                    o seu futuro
                                </p>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="sobre-missao">
                    <div className="missao-icone">
                        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                    </div>

                    <div className="missao-conteudo">
                        <h2>Nossa missão</h2>

                        <p>
                            Tornar a busca por formação mais simples, clara
                            e próxima da realidade de cada pessoa
                        </p>
                    </div>
                </section>

                <section className="sobre-valores">
                    <div className="secao-sobre-cabecalho">
                        <h2>
                            O que <span>valorizamos</span>
                        </h2>

                        <p>
                            Princípios que orientam nossa plataforma e a
                            maneira como queremos transformar o acesso
                            à informação
                        </p>
                    </div>

                    <div className="valores-lista">

                        <CardInfo
                            icone="person"
                            titulo="Acessibilidade"
                            mensagem="Educação de qualidade para todos, com oportunidades acessíveis e inclusivas, independentemente da realidade de cada pessoa"
                        />

                        <CardInfo
                            icone="shield"
                            titulo="Transparência"
                            mensagem="Informações confiáveis, claras e atualizadas para que todos possam fazer escolhas conscientes e encontrar as melhores oportunidades de aprendizado"
                        />

                        <CardInfo
                            icone="graduation-cap"
                            titulo="Educação"
                            mensagem="Mais do que oferecer cursos, acreditamos na educação como caminho para transformar vidas, desenvolver talentos e construir um futuro com mais oportunidades para todos"
                        />

                        <CardInfo
                            icone="star"
                            titulo="Oportunidades"
                            mensagem="Porque todo mundo merece uma chance de aprender, crescer e transformar sua realidade por meio de novas oportunidades de formação e desenvolvimento"
                        />

                    </div>
                </section>

            </main>

            <Rodape />
        </>
    );
}