
import './possibilidades.scss';
import Menu from '../../Components/Shared/Menu/menu.jsx';
import HeroSection from '../../Components/Shared/Hero-Section/hero.jsx';
import Rodape from '../../Components/Shared/Rodape/rodape.jsx';
import CardTecnologia from '../../Components/PossibilitiesComponents/cardTecnologia.jsx';
import Indice from '../../Components/Shared/Indice/indice.jsx';

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
                        <Indice
                            mensagem="ÁREAS PARA O SEU FUTURO"
                        />

                        <h2 className="titulo-areas">
                            Diversas áreas para você
                            <br />
                            explorar e construir
                            <br />
                            <span>o seu futuro</span>
                        </h2>

                        <p className="descricao-areas">
                            Aqui no Cursinho Pertinho, você encontra um mundo
                            de possibilidades. Nossas áreas foram pensadas para
                            te ajudar a descobrir seus interesses, desenvolver
                            suas habilidades e se preparar para o mercado de
                            trabalho ou para a universidade
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
                    <div className="lista-tecnologias" id='lista'>

                        <CardTecnologia
                            icone="computer"
                            titulo="Tecnologia"
                            mensagem="Explore o mundo digital e aprenda sobre programação, desenvolvimento de sistemas, redes e muito mais. Uma área com constante crescimento e cheia de oportunidades"
                            imagem="/Assets/Imgs/tecnologia.jpeg"
                        />

                        <CardTecnologia
                            icone="lightbulb"
                            titulo="Criatividade"
                            mensagem="Desenvolva sua imaginação e transforme ideias em projetos incríveis. Aqui, você encontra cursos voltados para design, artes, audiovisual e muito mais"
                            imagem="/Assets/Imgs/Arte.webp"
                        />

                        <CardTecnologia
                            icone="comment-dots"
                            titulo="Comunicação"
                            mensagem="Desenvolva sua expressão, argumentação e criatividade. Aqui, você encontra cursos de idioma, m[idias sociais e muito mais"
                            imagem="/Assets/Imgs/falas.jpeg"
                        />

                        <CardTecnologia
                            icone="chart-simple"
                            titulo="Negócios"
                            mensagem="Aprenda sobre gestão, marketing, vendas e empreendedorismo. Prepare-se para liderar, inovar e fazer diferença no mercado de trabalho"
                            imagem="/Assets/Imgs/investimentos.jpeg"
                        />

                    </div>
                </section>
                <div className="pai2">
    
    
            <div className="formação">
                
                <div className="formacao-tecnica">

                    <div className="conteudo-formacao">
                        <img className='engrenagem' src="/assets/Imgs/engrenagem.png" alt="" />
                       <h1 className='formacaoh1'>Formação Técnica</h1>
                       <p className='conquiste'>Conquiste uma profissão com cursos técnicos nas principais areas do merdado.Uma formação sólida para quem quer entrar nomercado de trabalho com mais preparo
                       </p>

                       <img  className='trabalhador' src="/assets/Imgs/trabalhador.png" alt="" />
                    </div>
            </div>
    </div>
</div>
            </main>
                   
            <Rodape />
        </>
    );
}