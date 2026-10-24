import './cursos.scss';

import { useLocation } from 'react-router-dom';

import Menu from '../../Components/Shared/Menu/menu.jsx';
import CardOferta from '../../Components/Shared/Card-Oferta/cardOferta.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';

export default function ExplorarCursos() {
    const location = useLocation();

    const cursosGratuitos = location.state?.cursosGratuitos ?? false;
    const cursosAte100 = location.state?.ate100 ?? "";
    const cursosPesquisa = location.state?.cursosPesquisa ?? "";
    const presencial = location.state?.presencial ?? "";
    const online = location.state?.online;
    const iniciante = location.state?.iniciante;
    const carga = location.state?.curtaDuracao;

    return (
        <>
            <Menu />

            <HeroSection
                imagem="Menina-Estudo.png"
                titulo="Os melhores cursos estão"
                tituloSpan="pertinho de você"
                mensagem="Encontre cursos de qualidade na sua região e conquiste novas habilidades para se destacar"
                mensagemDeBaixo="no mercado de trabalho, realizar seus sonhos e abrir portas para novas oportunidades"
                listaUser={true}
            />

            <section className="Destaques-Cursos">
                <div className="Destaques-Cabecalho">

                    <h2>
                        Seu próximo passo começa <span>aqui</span>
                    </h2>

                    <p>
                        Descubra oportunidades para desenvolver suas
                        habilidades, ampliar seus conhecimentos e se
                        preparar para o mercado de trabalho.
                    </p>
                </div>

                <div className="Destaques-Cards">
                    <article className="Destaque-Card">
                        <div className="Destaque-Icone Icone-Azul">
                            <i className="fa-solid fa-compass" />
                        </div>

                        <h3>Explore novas áreas</h3>

                        <p>
                            Conheça diferentes áreas de atuação e descubra
                            possibilidades para o seu futuro profissional.
                        </p>
                    </article>

                    <article className="Destaque-Card">
                        <div className="Destaque-Icone Icone-Azul">
                            <i className="fa-solid fa-laptop" />
                        </div>

                        <h3>Aprenda do seu jeito</h3>

                        <p>
                            Encontre opções presenciais e online que
                            combinam com sua rotina e suas necessidades.
                        </p>
                    </article>

                    <article className="Destaque-Card">
                        <div className="Destaque-Icone Icone-Azul">
                            <i className="fa-solid fa-rocket" />
                        </div>

                        <h3>Invista no seu futuro</h3>

                        <p>
                            Desenvolva novas competências e dê mais um
                            passo em direção aos seus objetivos.
                        </p>
                    </article>
                </div>

                <div className="Destaques-Informacao">
                    <i className="fa-solid fa-lightbulb" />

                    <div>
                        <h3>Encontre o curso ideal para você</h3>

                        <p>
                            Compare as opções disponíveis, considere seu
                            orçamento e escolha uma oportunidade que
                            combine com seus interesses.
                        </p>
                    </div>
                </div>
            </section>

            <h2 className="pesquisaCursinho">
                Encontre os <span>cursos</span> que mais combinam com você
            </h2>

            <CardOferta
                key={cursosPesquisa}
                cursoGratuito={cursosGratuitos}
                cursosPesquisa={cursosPesquisa}
                ate100={cursosAte100}
                presencial={presencial}
                online={online}
                iniciante={iniciante}
                curtaDuracao={carga}
            />

            <Rodape />
        </>
    );
}