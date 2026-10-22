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

            <section className="secao-cursos">
                <header className="cabecalho-secao-cursos">
                    <h2 className="titulo-secao-cursos">
                        CURSOS <span>PERTO DE VOCÊ</span>
                    </h2>

                    <p className="descricao-secao-cursos">
                        Veja algumas opções disponíveis na sua região
                    </p>
                </header>
            </section>

            <Rodape />
        </>
    );
}