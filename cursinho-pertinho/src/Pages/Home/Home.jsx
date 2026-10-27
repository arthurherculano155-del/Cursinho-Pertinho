import './Home.scss';

import Menu from '../../Components/Shared/Menu/menu';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';

export default function Home() {
    return (
        <>
            <Menu />

            <HeroSection
                imagem="Mulher-Cursinho.png"
                titulo="Encontre o melhor curso"
                tituloSpan="pertinho de você"
                mensagem="Cursos presenciais e online, de diversas áreas, com horários, preços e níveis para "
                mensagemDeBaixo="você se qualificar sem complicação."
                cardInicio={true}
            />

             <section className="proximidade">
            <div className="proximidade-conteudo">
                <div className="proximidade-etiqueta">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Mais perto do seu futuro</span>
                </div>

                <h2>
                    Estudar perto
                    <span>faz diferença.</span>
                </h2>

                <p className="proximidade-descricao">
               O Cursinho Pertinho ajuda você a encontrar cursos próximos da sua região e descobrir as melhores formas de chegar até eles. Clique nos botões de ônibus, metrô/trem ou a pé para visualizar os cursos disponíveis. Para consultar a melhor rota até o local escolhido, clique no link do endereço do curso. Assim, você economiza tempo e encontra o caminho mais adequado para sua rotina!
                </p>

                <div className="proximidade-beneficios">
                    <div className="beneficio">
                        <div className="beneficio-icone">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <p>
                            Cursos próximos
                            <br />
                            da sua região
                        </p>
                    </div>

                    <div className="beneficio">
                        <div className="beneficio-icone">
                            <i className="fa-solid fa-bus"></i>
                        </div>
                        <p>
                            Melhores opções
                            <br />
                            de transporte
                        </p>
                    </div>

                    <div className="beneficio">
                        <div className="beneficio-icone">
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <p>
                            Mais tempo
                            <br />
                            para você
                        </p>
                    </div>
                </div>
            </div>

            <div className="proximidade-visual">
                <div className="mapa-ilustracao">
                    <div className="mapa-ruas"></div>

                    <div className="mapa-parque parque-um"></div>
                    <div className="mapa-parque parque-dois"></div>

                    <div className="mapa-marcador marcador-casa">
                        <i className="fa-solid fa-house"></i>
                    </div>

                    <svg
                        className="mapa-rota"
                        viewBox="0 0 440 350"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M 60 75 C 75 130, 110 95, 145 135 S 210 145, 235 205 S 300 235, 355 260"
                            fill="none"
                            stroke="#2585ff"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="60" cy="75" r="8" fill="#2585ff" />
                        <circle cx="145" cy="135" r="8" fill="#2585ff" />
                        <circle cx="235" cy="205" r="8" fill="#2585ff" />
                        <circle cx="355" cy="260" r="8" fill="#2585ff" />
                    </svg>

                    <div className="mapa-marcador marcador-curso">
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                </div>

             

                <div className="transporte-lista">
                    <div className="transporte-item">
                        
                        <div className="transporte-icone">
                            <i className="fa-solid fa-bus-simple"></i>
                        </div>

                        <div className="transporte-info">
                            <p>Ônibus</p>
                        </div>

                        <i className="fa-solid fa-chevron-right transporte-seta"></i>
                    </div>

                    <div className="transporte-item">

                        <div className="transporte-icone">
                            <i className="fa-solid fa-train-subway"></i>
                        </div>

                        <div className="transporte-info">
                            <p>Metrô</p>
                        </div>
                        
                        <i className="fa-solid fa-chevron-right transporte-seta"></i>
                    </div>

                    <div className="transporte-item">

                        <div className="transporte-icone">
                            <i className="fa-solid fa-person-walking"></i>
                        </div>

                        <div className="transporte-info">
                            <p>A pé</p>
                        </div>

                        <i className="fa-solid fa-chevron-right transporte-seta"></i>
                    </div>
                </div>
            </div>

            <div className="proximidade-forma forma-superior"></div>
            <div className="proximidade-forma forma-inferior"></div>
        </section>
    

            <Rodape />
        </>
    );
}