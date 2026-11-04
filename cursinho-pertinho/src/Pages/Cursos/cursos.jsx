import './cursos.scss';

import { useLocation } from 'react-router-dom';

import Menu from '../../Components/Shared/Menu/menu.jsx';
import CardOferta from '../../Components/Shared/Card-Oferta/cardOferta.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';
import Indice from '../../Components/Shared/Indice/indice.jsx';
import { useEffect } from 'react';

export default function ExplorarCursos() {
    const location = useLocation();

    const cursosGratuitos = location.state?.cursosGratuitos ?? false;
    const cursosAte100 = location.state?.ate100 ?? "";
    const cursosPesquisa = location.state?.cursosPesquisa ?? "";
    const presencial = location.state?.presencial ?? "";
    const online = location.state?.online;
    const iniciante = location.state?.iniciante;
    const carga = location.state?.curtaDuracao;

    useEffect(() => {
        if (location.hash) {
            document.querySelector(location.hash)?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [location]);

    return (
        <>
            <Menu />

            <HeroSection
                imagem="Menina-Estudo.png"
                titulo="Os melhores cursos estão"
                tituloSpan="pertinho de você"
                mensagem="Encontre cursos de qualidade na sua região e conquiste novas habilidades para se destacar "
                mensagemDeBaixo="no mercado de trabalho, realizar seus sonhos, desenvolver novas habilidades e abrir portas para oportunidades de crescimento pessoal e profissional"
                listaUser={true}
            />

            <main className="pagina-cursos">
                <section className="secao-explorar-cursos">
                    <div className="cabecalho-explorar-cursos">
                        <div>
                            <Indice
                                mensagem="Explore oportunidades"
                            />

                            <h2>
                                Encontre o curso <span>ideal para você</span>
                            </h2>

                            <p>
                                Utilize a pesquisa e os filtros para encontrar
                                cursos de acordo com sua região, seus interesses
                                e suas possibilidades
                            </p>
                        </div>

                        <div className="icone-cabecalho-cursos">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    <div className="conteudo-ofertas-cursos" id="pesquisa">
                        <CardOferta
                            cursoGratuito={cursosGratuitos}
                            cursosPesquisa={cursosPesquisa}
                            ate100={cursosAte100}
                            presencial={presencial}
                            online={online}
                            iniciante={iniciante}
                            curtaDuracao={carga}
                        />
                    </div>
                </section>
            </main>

            <Rodape />
        </>
    );
}