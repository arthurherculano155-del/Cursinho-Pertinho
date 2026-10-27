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
                mensagem="Encontre cursos de qualidade na sua região e conquiste novas habilidades para se destacar "
                mensagemDeBaixo="no mercado de trabalho, realizar seus sonhos, desenvolver novas habilidades e abrir portas para oportunidades de crescimento pessoal e profissional"
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
            </section>

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