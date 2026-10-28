import './hero.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CardInicio from '../../HomeComponents/CardInicio/cardInicio.jsx';

export default function HeroSection({
    imagem,
    titulo,
    tituloSpan,
    mensagem,
    listaUser,
    mensagemDeBaixo,
    cardInicio = false,
    botoes = false,
    conhecerProjeto = false
}) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    const [listaOfertas, setListaOfertas] = useState(false);
    const [cardsLista, setCardsLista] = useState([]);
    const [cursosPesquisa, setCursosPesquisa] = useState("");

    const ate100 = true;
    const cursosGratuitos = true;
    const presencial = true;
    const online = true;
    const iniciante = true;
    const curtaDuracao = true;

    const navigate = useNavigate();

    async function DeletarOfertaLista(oferta) {
        const resposta = await
            fetch(`https://cursinhopertinho-api.onrender.com/usuario/ofertas/deletar`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    oferta: oferta
                })
            })

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro)
            return;
        }

        alert("Oferta removida de sua lista!")
    }

    useEffect(() => {
        async function BuscarListaOfertas() {
            if (!usuario?.id) {
                setCardsLista([]);
                return;
            }

            try {
                const resposta = await fetch(
                    `https://cursinhopertinho-api.onrender.com/ofertas/lista/${usuario.id}`
                );

                const dados = await resposta.json();

                if (!resposta.ok) {
                    alert(dados.erro || "Erro ao buscar as ofertas.");
                    return;
                }

                setCardsLista(dados)

            } catch (erro) {

                alert("Não foi possível carregar sua lista de ofertas.");
            }
        }

        if(usuario){
            BuscarListaOfertas()
        }
    }, [
        usuario,
        cardsLista,
        usuario?.id    
    ])

    function BuscarPoucaDuracao() {
        navigate('/explorar-cursos', {
            state: { curtaDuracao }
        });
    }

    function BuscarCursoIniciante() {
        navigate('/explorar-cursos', {
            state: { iniciante }
        });
    }

    function BuscarCursosOnline() {
        navigate('/explorar-cursos', {
            state: { online }
        });
    }

    function BuscarCursosGratuitos() {
        navigate('/explorar-cursos', {
            state: { cursosGratuitos }
        });
    }

    function BuscarCursosPresenciais() {
        navigate('/explorar-cursos', {
            state: { presencial }
        });
    }

    function BuscarAte100() {
        navigate('/explorar-cursos', {
            state: { ate100 }
        });
    }

    function BuscarNomeCurso() {
        navigate('/explorar-cursos', {
            state: { cursosPesquisa }
        });
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

            {listaUser && (
                <button
                    className="listaCursos"
                    onClick={() => {
                        setListaOfertas(true);
                    }}
                >
                    Ver minha lista
                </button>
            )}

            {listaOfertas && createPortal(
                <section
                    className="fundo"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setListaOfertas(false);
                        }
                    }}
                >
                    <button
                        className="fechar"
                        onClick={() => setListaOfertas(false)}
                        aria-label="Fechar lista de ofertas"
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>

                    <div className="janelaLista">
                        <h2 className="tituloLista">
                            Olá, {usuario ? usuario.primeiro_nome : "aluno"}!
                        </h2>

                        {usuario ? (
                            <section className="Cards-De-Oferta">
                                <div>
                                    <h3 className="subtituloLista">
                                        Veja a sua lista de cursos:
                                    </h3>
                                </div>

                                {cardsLista.length > 0 ? (
                                    <div className="listaOfertas">
                                        {cardsLista.map((oferta) => (
                                            <article
                                                className="card-Oferta"
                                                key={oferta.id}
                                            >
                                                <button
                                                    className="Deletar-Da-Lista"
                                                    onClick={() => DeletarOfertaLista(oferta.id)}
                                                >
                                                   <i className="fa-solid fa-minus" /> Remover Oferta
                                                </button>
                                                <img
                                                    src={oferta.imagem}
                                                    alt={`Imagem do curso ${oferta.curso}`}
                                                    className="instituicao"
                                                />

                                                <h2>{oferta.curso}</h2>

                                                <h3>{oferta.unidade}</h3>

                                                <p>
                                                    Nível: {oferta.nivel}
                                                </p>

                                                <h5>
                                                    Modalidade: {oferta.modalidade}
                                                </h5>

                                                {oferta.modalidade !== "Online" && (
                                                    <h5>
                                                        Endereço:{" "}
                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${oferta.endereco}, ${oferta.numero}`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {oferta.endereco}, {oferta.numero}
                                                        </a>
                                                    </h5>
                                                )}

                                                <h5>
                                                    Preço: R${" "}
                                                    {Number(oferta.preco).toFixed(2)}
                                                </h5>

                                                <h5>
                                                    Carga horária: {oferta.carga_horaria} horas
                                                </h5>

                                                <h5>
                                                    Link:{" "}
                                                    <a
                                                        href={oferta.link_inscricao}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Inscrever-se
                                                    </a>
                                                </h5>

                                                <h5>
                                                    Região: {oferta.regiao}
                                                </h5>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="listaVazia">
                                        Você ainda não adicionou ofertas à sua lista.
                                    </p>
                                )}
                            </section>
                        ) : (
                            <p className="mensagemLogin">
                                Você precisa estar logado para ter uma lista!
                            </p>
                        )}
                    </div>
                </section>,
                document.body
            )}

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
                                if (e.key === "Enter") {
                                    BuscarNomeCurso();
                                }
                            }}
                        />

                        <button
                            className="buscar"
                            onClick={BuscarNomeCurso}
                        >
                            Buscar curso
                        </button>
                    </div>

                    <section className="Card-Home-Section">
                        <CardInicio
                            referencia="/explorar-cursos"
                            grupo="fa-solid"
                            icone="fa-laptop"
                            onClick={BuscarCursosPresenciais}
                            modalidade="Presencial"
                        />

                        <CardInicio
                            referencia="/explorar-cursos"
                            grupo="fa-solid"
                            icone="fa-wifi"
                            onClick={BuscarCursosOnline}
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
                            onClick={BuscarAte100}
                            modalidade="Até R$ 100"
                        />

                        <CardInicio
                            referencia="/explorar-cursos"
                            grupo="fa-solid"
                            icone="fa-seedling"
                            onClick={BuscarCursoIniciante}
                            modalidade="Nível Iniciante"
                        />

                        <CardInicio
                            referencia="/explorar-cursos"
                            grupo="fa-solid"
                            icone="fa-clock"
                            onClick={BuscarPoucaDuracao}
                            modalidade="Curta duração"
                        />
                    </section>
                </>
            )}

            {botoes && (
                <section className="botoesHero">
                    <button className="buscarCursos">
                        Buscar Cursos
                    </button>

                    <button className="explorarAreas">
                        Explorar Áreas
                    </button>
                </section>
            )}

            {conhecerProjeto && (
                <button className="conhecerProjeto">
                    Conheça o projeto
                </button>
            )}
        </main>
    );
}