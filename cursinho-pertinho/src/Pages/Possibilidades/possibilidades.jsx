
import './possibilidades.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';
import CardTecnologia from '../../Components/PossibilitiesComponents/cardTecnologia.jsx';

export default function Possibilidades() {
    return (
        <>
            <Menu />

            <HeroSection
                imagem="Horizonte.webp"
                titulo="Seu futuro tem "
                tituloSpan="muitas possibilidades"
                mensagem="Descubra seus interesses, explore novos caminhos de aprendizado e encontre "
                mensagemDeBaixo="novas oportunidades para aprender, desenvolver habilidades e crescer pessoalmente e profissionalmente"
                botoes={true}
            />

            <main className="pagina-possibilidades">
                <section className="secao-areas">
                    <div className="conteudo-areas">
                        <span className="etiqueta-areas">
                            CONHEÇA NOSSAS ÁREAS
                        </span>

                        <h2 className="titulo-areas">
                            Diversas áreas para você
                            <br />
                            explorar e construir
                            <br />
                            <span>o seu futuro.</span>
                        </h2>

                        <p className="descricao-areas">
                            Aqui no Cursinho Pertinho, você encontra um mundo
                            de possibilidades. Nossas áreas foram pensadas para
                            te ajudar a descobrir seus interesses, desenvolver
                            suas habilidades e se preparar para o mercado de
                            trabalho ou para a universidade.
                        </p>
                    </div>

                    <div className="visual-areas">
                        <img
                            src="/Assets/Imgs/estudantebigode.png"
                            className="imagem-estudante-areas"
                            alt="Estudante aprendendo e explorando novas possibilidades"
                        />
                    </div>
                </section>

                <section className="secao-tecnologias">
                    <div className="lista-tecnologias">
                        <CardTecnologia
                            icone="computer"
                            titulo="Tecnologia"
                            mensagem="Explore o mundo digital e aprenda sobre programação, desenvolvimento de sistemas, redes e muito mais. Uma área com constante crescimento e cheia de oportunidades."
                            imagem="/Assets/Imgs/tecnologia.jpeg"
                        />
                    </div>
                </section>
            </main>

            <Rodape />
        </>
    );
}