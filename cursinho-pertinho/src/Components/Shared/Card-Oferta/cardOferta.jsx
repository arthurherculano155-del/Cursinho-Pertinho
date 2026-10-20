import './cardOferta.scss'
import { useState } from "react";

export default function CardOferta({
    lixeira = false,
    addLista = true,
    nomeValor
}) {
    const API_URL = "https://cursinhopertinho-api.onrender.com";

    const token = localStorage.getItem("token")

    const [modal, setModal] = useState(null);

    async function InserirOferta(id_oferta) {
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
            alert(dados.erro)
            return;
        }

        alert(`Número de cadastro na lista: ${dados.ID}`)
    }

    async function deleteOferta(id) {
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
            return
        }

        alert(`Oferta com ID ${id} deletado!`)
    }

    return (
        <>
            {nomeValor.map((oferta) => (
                <div
                    className="card-Oferta"
                    key={oferta.id}
                    value={oferta.id}>
                    <img src={oferta.imagem} alt="Imagem Curso" className="instituicao" />
                    <h2>{oferta.unidade}</h2>
                    <h3>{oferta.curso}</h3>
                    <p>Nível: {oferta.nivel}</p>
                    <h5>Modalidade: {oferta.modalidade}</h5>
                    {oferta.modalidade === "Online" ? "" : (
                        <h5>
                            Endereço:{" "}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(oferta.endereco)},${encodeURIComponent(oferta.numero)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {oferta.endereco}, {oferta.numero}
                            </a>
                        </h5>
                    )}
                    <h5>Preço: R$ {oferta.preco.toFixed(2)}</h5>
                    <h5>Carga horária: {oferta.carga_horaria} horas</h5>
                    <h5>Link: <a
                        href={oferta.link_inscricao}
                        target="_blank"
                        rel="noreferrer"
                    >Inscrever-se</a></h5>
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
                        <div
                            className="lixeira"
                            onClick={() => setModal(oferta.id)}
                        >
                            <i className="fa-solid fa-trash-can" />
                        </div>
                    )}

                    {modal === oferta.id && (
                        <div className="fundo">
                            <section className="apagar">
                                <h2>
                                    Tem certeza de que deseja apagar o curso {oferta.curso}?</h2>

                                <div className="buttons">
                                    <button onClick={() => {
                                        deleteOferta(oferta.id)
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 2000)
                                    }}
                                        className="yep">Sim</button>
                                    <button
                                        onClick={() => setModal(false)}
                                        className="not">Não</button>
                                </div>
                            </section>
                        </div>
                    )}

                </div>
            ))
            }
        </>
    )
}