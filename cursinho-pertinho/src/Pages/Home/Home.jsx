import './Home.scss';

import Menu from '../../Components/Shared/Menu/menu';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';
import MapaUnidades from '../../Components/HomeComponents/MapaUnidades/mapa.jsx';
import Indice from '../../Components/Shared/Indice/indice.jsx';

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

            <section className="secao-mapa-home">
                <div className="cabecalho-mapa-home">
                    <Indice 
                        mensagem="Encontre seu caminho"
                    />

                    <h2>
                        Instituições <span>pertinho de você</span>
                    </h2>

                    <p>
                        Explore o mapa e descubra instituições de ensino
                        distribuídas pelas regiões de São Paulo. Encontre
                        unidades próximas e conheça novas oportunidades
                        de formação
                    </p>
                </div>

                <MapaUnidades />
            </section>

            <Rodape />
        </>
    );
}