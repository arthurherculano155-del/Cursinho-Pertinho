import './hero.scss';
import { useNavigate } from 'react-router-dom';
import CardInicio from '../../HomeComponents/CardInicio/cardInicio.jsx';
import { useState } from 'react';

export default function HeroSection({
    imagem,
    titulo,
    tituloSpan,
    mensagem,
    mensagemDeBaixo,
    cardInicio = false,
    botoes = false,
    conhecerProjeto = false
}) {

    const [cursosPesquisa, setCursosPesquisa] = useState("");

    const cursosGratuitos = true;

    const navigate = useNavigate();

    function BuscarCursosGratuitos() {
        navigate('/explorar-cursos', {
            state: { cursosGratuitos }
        })
    }

    function BuscarNomeCurso() {
        navigate('/explorar-cursos', {
            state: { cursosPesquisa }
        })
    }

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
                            value={cursosPesquisa}
                            placeholder="Qual curso você quer encontrar?"
                            onChange={(e) => setCursosPesquisa(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    BuscarNomeCurso()
                                }
                            }}
                        />

                        <button className="buscar"
                            onClick={BuscarNomeCurso}>
                            Buscar curso
                        </button>
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
                            onClick={BuscarCursosGratuitos}
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

            {conhecerProjeto && (
                <button
                    className="conhecerProjeto">
                    Conheça o projeto
                </button>
            )}
        </main>
    )
}