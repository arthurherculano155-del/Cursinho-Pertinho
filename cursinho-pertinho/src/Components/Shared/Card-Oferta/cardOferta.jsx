import './cardOferta.scss'
import { useState, useEffect } from "react";

export default function CardOferta({
    lixeira = false,
    cursoGratuito,
    addLista = true
}) {
    const API_URL = "https://cursinhopertinho-api.onrender.com";

    const token = localStorage.getItem("token");

    const [cardOferta, setCardOferta] = useState([]);
    const [modal, setModal] = useState(null);

    const [regiaoPesquisa, setRegiaoPesquisa] = useState("");
    const [cursoPesquisa, setCursoPesquisa] = useState("");
    const [instituicaoPesquisa, setInstituicaoPesquisa] = useState("");
    const [nivelPesquisa, setNivelPesquisa] = useState("");
    const [modalidadePesquisa, setModalidadePesquisa] = useState("");
    const [precoMinimo, setPrecoMinimo] = useState("");
    const [precoMaximo, setPrecoMaximo] = useState("");

    const minimo = cursoGratuito ? "" : precoMinimo;
    const maximo = cursoGratuito ? 0 : precoMaximo;

    useEffect(() => {
        async function getOfertas() {
            try {
                const resposta = await fetch(
                    `${API_URL}/ofertas?regiao=${encodeURIComponent(regiaoPesquisa)}&curso=${encodeURIComponent(cursoPesquisa)}&instituicao=${encodeURIComponent(instituicaoPesquisa)}&nivel=${encodeURIComponent(nivelPesquisa)}&modalidade=${encodeURIComponent(modalidadePesquisa)}&precoMinimo=${encodeURIComponent(minimo)}&precoMaximo=${encodeURIComponent(maximo)}`
                );

                if (!resposta.ok) {
                    throw new Error("Não foi possível carregar as ofertas.");
                }

                const dados = await resposta.json();
                setCardOferta(dados);
            } catch (erro) {
                console.error("Erro ao buscar ofertas:", erro);
            }
        }

        getOfertas();
    }, [
        regiaoPesquisa,
        cursoPesquisa,
        instituicaoPesquisa,
        nivelPesquisa,
        modalidadePesquisa,
        minimo,
        maximo,
        cursoGratuito
    ]);

    async function InserirOferta(id_oferta) {
        try {
            const resposta = await fetch(`${API_URL}/ofertas/cadastrar`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    oferta: id_oferta
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro);
                return;
            }

            alert(`Número de cadastro na lista: ${dados.length}`);
        } catch (erro) {
            console.error("Erro ao adicionar oferta:", erro);
            alert("Não foi possível adicionar a oferta.");
        }
    }

    async function deleteOferta(id) {
        try {
            const token = localStorage.getItem("token");

            const resposta = await fetch(`${API_URL}/ofertas/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro);
                return false;
            }

            alert(`Oferta com ID ${id} deletada!`);
            return true;
        } catch (erro) {
            console.error("Erro ao excluir oferta:", erro);
            alert("Não foi possível excluir a oferta.");
            return false;
        }
    }

    return (
        <article className="Cards-De-Oferta">
            <section className="Pesquisa-inputs">
                <input
                    type="text"
                    className="input-pesquisa"
                    placeholder="Insira o nome do curso"
                    value={cursoPesquisa}
                    onChange={(e) => setCursoPesquisa(e.target.value)}
                />

                <input
                    type="text"
                    className="input-pesquisa"
                    placeholder="Insira o nome da instituição"
                    value={instituicaoPesquisa}
                    onChange={(e) => setInstituicaoPesquisa(e.target.value)}
                />

                <input
                    type="number"
                    className="input-pesquisa"
                    placeholder="Preço mínimo"
                    value={precoMinimo}
                    onChange={(e) => setPrecoMinimo(e.target.value)}
                />

                <input
                    type="number"
                    className="input-pesquisa"
                    placeholder="Preço máximo"
                    value={cursoGratuito ? 0 : precoMaximo}
                    onChange={(e) => setPrecoMaximo(e.target.value)}
                />

                <select
                    className={`Pesquisa-Informacao ${regiaoPesquisa === "" ? "placeholder-select" : ""}`}
                    value={regiaoPesquisa}
                    onChange={(e) => setRegiaoPesquisa(e.target.value)}
                >
                    <option value="" disabled>
                        Escolha uma região
                    </option>

                    <option value="Zona Norte">Zona Norte</option>
                    <option value="Zona Sul">Zona Sul</option>
                    <option value="Zona Leste">Zona Leste</option>
                    <option value="Zona Oeste">Zona Oeste</option>
                    <option value="Centro">Centro</option>
                </select>

                <select
                    className={`Pesquisa-Informacao ${nivelPesquisa === "" ? "placeholder-select" : ""}`}
                    value={nivelPesquisa}
                    onChange={(e) => setNivelPesquisa(e.target.value)}
                >
                    <option value="" disabled>
                        Escolha um nível
                    </option>

                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                </select>

                <select
                    className={`Pesquisa-Informacao ${modalidadePesquisa === "" ? "placeholder-select" : ""}`}
                    value={modalidadePesquisa}
                    onChange={(e) => setModalidadePesquisa(e.target.value)}
                >
                    <option value="" disabled>
                        Escolha uma modalidade
                    </option>

                    <option value="Presencial">Presencial</option>
                    <option value="Online">Online</option>
                    <option value="Híbrido">Híbrido</option>
                </select>
            </section>

            {cardOferta.map((oferta) => (
                <div
                    className="card-Oferta"
                    key={oferta.id}
                >
                    <img
                        src={oferta.imagem}
                        alt={`Imagem do curso ${oferta.curso}`}
                        className="instituicao"
                    />

                    <h2>{oferta.curso}</h2>
                    <h3>{oferta.unidade}</h3>
                    <p>Nível: {oferta.nivel}</p>
                    <h5>Modalidade: {oferta.modalidade}</h5>

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

                    <h5>Preço: R$ {Number(oferta.preco).toFixed(2)}</h5>
                    <h5>Carga horária: {oferta.carga_horaria} horas</h5>

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

                    <h5>Região: {oferta.regiao}</h5>

                    {addLista && (
                        <button
                            type="button"
                            className="adicionar-lista"
                            onClick={() => InserirOferta(oferta.id)}
                        >
                            <i className="fa-solid fa-plus" />
                            <span>Adicionar à lista</span>
                        </button>
                    )}

                    {lixeira && (
                        <button
                            type="button"
                            className="lixeira"
                            aria-label={`Excluir oferta ${oferta.curso}`}
                            onClick={() => setModal(oferta.id)}
                        >
                            <i className="fa-solid fa-trash-can" />
                        </button>
                    )}

                    {modal === oferta.id && (
                        <div className="fundo">
                            <section
                                className="apagar"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby={`titulo-modal-${oferta.id}`}
                            >
                                <h2 id={`titulo-modal-${oferta.id}`}>
                                    Tem certeza de que deseja apagar o curso {oferta.curso}?
                                </h2>

                                <div className="buttons">
                                    <button
                                        type="button"
                                        className="yep"
                                        onClick={async () => {
                                            const sucesso = await deleteOferta(oferta.id);

                                            if (sucesso) {
                                                setModal(null);
                                                setCardOferta((ofertas) =>
                                                    ofertas.filter((item) => item.id !== oferta.id)
                                                );
                                            }
                                        }}
                                    >
                                        Sim
                                    </button>

                                    <button
                                        type="button"
                                        className="not"
                                        onClick={() => setModal(null)}
                                    >
                                        Não
                                    </button>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            ))}
        </article>
    );
}