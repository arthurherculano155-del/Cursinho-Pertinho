import { createPortal } from 'react-dom';
import { useState, useEffect, useMemo } from "react";
import Fuse from 'fuse.js';

import './cardOferta.scss'

export default function CardOferta({
    lixeira = false,
    ate100,
    presencial,
    online,
    iniciante,
    cursoGratuito,
    cursosPesquisa,
    curtaDuracao,
    addLista = true
}) {
    const API_URL = "https://cursinhopertinho-api.onrender.com";

    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    const [cardOferta, setCardOferta] = useState([]);
    const [modal, setModal] = useState(null);

    const [regiaoPesquisa, setRegiaoPesquisa] = useState("");
    const [cursoPesquisa, setCursoPesquisa] = useState(cursosPesquisa || "");
    const [instituicaoPesquisa] = useState("");
    const [nivelPesquisa] = useState("");
    const [modalidadePesquisa] = useState("");
    const [precoMinimo] = useState("");
    const [precoMaximo] = useState("");
    const [cargaHoraria] = useState("");

    const nivel = iniciante ? "Iniciante" : nivelPesquisa
    const pesquisaCurso = cursoPesquisa;
    const minimo = cursoGratuito ? 0 : precoMinimo;
    const maximo = cursoGratuito ? 0 : ate100 ? 100 : precoMaximo;
    const modalidade =
        (presencial ? "Presencial" : modalidadePesquisa) ||
        (online ? "Online" : modalidadePesquisa);
    const carga = curtaDuracao ? 40 : cargaHoraria;

    useEffect(() => {
        async function getOfertas() {
            try {
                const resposta = await fetch(
                    `${API_URL}/ofertas?regiao=${encodeURIComponent(regiaoPesquisa)}&instituicao=${encodeURIComponent(instituicaoPesquisa)}&nivel=${encodeURIComponent(nivel)}&modalidade=${encodeURIComponent(modalidade)}&precoMinimo=${encodeURIComponent(minimo)}&precoMaximo=${encodeURIComponent(maximo)}&carga=${carga}`
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
        instituicaoPesquisa,
        nivel,
        modalidade,
        minimo,
        maximo,
        carga,
        cursoGratuito,
        token
    ]);

    const ofertasFiltradas = useMemo(() => {
        const termo = cursoPesquisa.trim();

        if(!termo)
            return cardOferta;

        const fuse = new Fuse(cardOferta, {
            keys: [
                {name: "curso",  weight: 0.5},
                {name: "tags",  weight: 0.3},
                {name: "descricao",  weight: 0.15},
                {name: "unidade",  weight: 0.05}
            ],
            threshold: 0.35,
            ignoreLocation: true
        })

        return fuse.search(termo).map((resultado) => resultado.item)
    }, [cardOferta, cursoPesquisa])

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

            if(!usuario){
                alert("Você precisa estar logado para adicionar uma oferta.");
                return
            }

            if (!resposta.ok) {
                alert(dados.erro);
                return;
            }

            alert(`A oferta foi cadastrada em sua lista!`);
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
                    value={pesquisaCurso}
                    onChange={(e) => setCursoPesquisa(e.target.value)}
                />

                <select
                    className={`Pesquisa-Informacao ${regiaoPesquisa === "" ? "placeholder-select" : ""}`}
                    value={regiaoPesquisa}
                    onChange={(e) => setRegiaoPesquisa(e.target.value)}
                >
                    <option value="">
                        Escolha uma região
                    </option>

                    <option value="Zona Norte">Zona Norte</option>
                    <option value="Zona Sul">Zona Sul</option>
                    <option value="Zona Leste">Zona Leste</option>
                    <option value="Zona Oeste">Zona Oeste</option>
                    <option value="Centro">Centro</option>
                </select>
            </section>

            {ofertasFiltradas.map((oferta) => (
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
                        Tags: {oferta.tags.split(",").map((tag) => (
                            <span
                                key={tag}
                            >{tag}</span>
                        ))}
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
                            onClick={() => setModal(oferta.id)}
                        >
                            <i className="fa-solid fa-trash-can" />
                        </button>
                    )}

                    {modal === oferta.id && createPortal(
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
                        </div>,
                        document.body
                    )}
                </div>
            ))}
        </article>
    );
}