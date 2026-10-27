
import './sobre.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';

export default function Sobre() {
    return (
        <>
            <Menu />

            <main className="pagina-sobre">
                <HeroSection
                    imagem="Estudantes.png"
                    titulo="Conectamos pessoas a "
                    tituloSpan="novas oportunidades"
                    mensagem="O Cursinho Pertinho facilita o acesso à informação sobre cursos e caminhos de formação"
                    mensagemDeBaixo="para que cada pessoa possa construir seu futuro. O Cursinho Pertinho facilita a busca por cursos de diferentes áreas, reunindo informações sobre instituições, modalidades, níveis de ensino, preços e localização em um só lugar."
                    conhecerProjeto={true}
                />

                <section className="sobre-introducao">
                    <h2 className="sobre-titulo">Quem somos</h2>

                    <div className="sobre-conteudo">
                        <p className="sobre-descricao">
                            Somos uma plataforma que ajuda você a descobrir
                            cursos, oportunidades e caminhos de formação de
                            acordo com a região, modalidade, nível, instituição
                            e preço. Tudo em um só lugar, de forma simples e
                            segura.
                        </p>

                        <img
                            className="sobre-imagem"
                            src="/Assets/Imgs/mapa.png"
                            alt="Ilustração que representa a localização de cursos e instituições de ensino"
                        />
                    </div>
                </section>

                <section className="sobre-beneficios">
                    <article className="beneficio-card">
                        <i className="fa-solid fa-crosshairs" aria-hidden="true"></i>

                        <div className="beneficio-conteudo">
                            <h3>Aproximar oportunidades</h3>
                            <p>
                                Conectamos você a cursos e instituições que
                                fazem sentido para o seu momento e para os
                                seus objetivos.
                            </p>
                        </div>
                    </article>

                    <article className="beneficio-card">
                        <i className="fa-regular fa-file-lines" aria-hidden="true"></i>

                        <div className="beneficio-conteudo">
                            <h3>Informação acessível</h3>
                            <p>
                                Reunimos em um só lugar dados claros e
                                atualizados para você comparar e escolher
                                com mais segurança.
                            </p>
                        </div>
                    </article>

                    <article className="beneficio-card">
                        <i className="fa-solid fa-user" aria-hidden="true"></i>

                        <div className="beneficio-conteudo">
                            <h3>Apoiar escolhas</h3>
                            <p>
                                Acreditamos no seu potencial e trabalhamos
                                para que você encontre o curso ideal para
                                o seu futuro.
                            </p>
                        </div>
                    </article>
                </section>

                <section className="sobre-missao">
                    <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>

                    <div className="missao-conteudo">
                        <h2>Nossa missão</h2>
                        <p>
                            Tornar a busca por formação mais simples, clara
                            e próxima da realidade de cada pessoa.
                        </p>
                    </div>
                </section>

                <section className="sobre-valores">
                    <h2 className="valores-titulo">O que valorizamos</h2>

                    <div className="valores-lista">
                        <article className="valor-item">
                            <i className="fa-solid fa-person" aria-hidden="true"></i>

                            <div className="valor-conteudo">
                                <h3>Acessibilidade</h3>
                                <p>Educação de qualidade para todos.</p>
                            </div>
                        </article>

                        <article className="valor-item">
                            <i className="fa-solid fa-shield" aria-hidden="true"></i>

                            <div className="valor-conteudo">
                                <h3>Transparência</h3>
                                <p>Informações confiáveis e atualizadas.</p>
                            </div>
                        </article>

                        <article className="valor-item">
                            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>

                            <div className="valor-conteudo">
                                <h3>Educação</h3>
                                <p>Mais do que cursos, formamos futuros.</p>
                            </div>
                        </article>

                        <article className="valor-item">
                            <i className="fa-regular fa-star" aria-hidden="true"></i>

                            <div className="valor-conteudo">
                                <h3>Oportunidades</h3>
                                <p>Porque todo mundo merece uma chance.</p>
                            </div>
                        </article>
                    </div>
                </section>
            </main>

            <Rodape />
        </>
    );
}