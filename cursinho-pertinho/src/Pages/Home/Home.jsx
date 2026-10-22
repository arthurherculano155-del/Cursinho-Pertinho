
import Menu from '../../Components/Shared/Menu/menu';
import './Home.scss';
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

            <section className="Vista">
                <section className="selo-futuro">
                    <i className="fa-solid fa-location-dot" />
                    <h2>Mais perto do seu futuro</h2>
                </section>

                <h2 className="titulo-proximidade">
                    Estudar perto
                    <span>faz diferença.</span>
                </h2>

                <p className="descricao-proximidade">
                    Encontre oportunidades de ensino perto de você
                    e descubra caminhos mais simples para chegar até elas.
                </p>
            </section>

            <Rodape />
        </>
    );
}