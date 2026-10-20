import './hero.scss';
import { Link } from 'react-router-dom';
import CardInicio from '../../HomeComponents/CardInicio/cardInicio.jsx';

export default function HeroSection({
    imagem,
    titulo,
    tituloSpan,
    mensagem,
    mensagemDeBaixo,
    cardInicio = false,
    botoes = false
}) {
    return (
        <main className="Hero-Section">
            <img
                className="Imagem-Hero"
                src={`/Assets/Imgs/${imagem}`}
                alt="Imagem-Hero-Section"
            />

            <div className="Hero-Msg">
                <h1 className="Titulo">
                    {titulo}
                    <br />
                    <span>{tituloSpan}</span>
                </h1>

                <p>
                    {mensagem}
                    <br />
                    {mensagemDeBaixo}
                </p>
            </div>

            {cardInicio && (
                <>
                <div className="Pesquisa-Home">
                <i className="fa-solid fa-magnifying-glass" />

                <input
                    type="text"
                    placeholder="Qual curso você quer encontrar?"
                    aria-label="Qual curso você quer encontrar?"
                />

                <Link className="buscar" to="/explorar-cursos">
                    Buscar cursos
                </Link>
            </div>

                <section className="Card-Home-Section">
                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-laptop"
                        modalidade="Presencial"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-wifi"
                        modalidade="Online"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-tag"
                        modalidade="Gratuito"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-money-bill"
                        modalidade="Até R$ 100"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-seedling"
                        modalidade="Nível Iniciante"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-clock"
                        modalidade="Curta duração"
                    />
                </section>
                </>
            )}

            {botoes && (
                <>
                    <section className="botoesHero">
                        <button className="buscarCursos">
                            Buscar Cursos
                        </button>


                        <button className="explorarAreas">
                            Explorar Áreas
                        </button>
                    </section>
                </>
            )}
        </main>
    )
}