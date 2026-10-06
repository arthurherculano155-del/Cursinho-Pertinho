import { useState, useEffect } from "react";

export default function CardOferta() {
    const API_URL = "https://cursinhopertinho-api.onrender.com";
    const lixeira = true;

    const [cardOferta, setCardOferta] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    const [modal, setModal] = useState(null);

    useEffect(() => {
        async function getOfertas() {
            const resposta = await fetch(`${API_URL}/ofertas?regiao=${pesquisa}`);

            const dados = await resposta.json();

            setCardOferta(dados);
        }

        getOfertas()
    }, [pesquisa]);

    async function deleteOferta(id) {
        await fetch(`${API_URL}/ofertas/${id}`, {
            method: "DELETE"
        })

        alert(`Oferta com ID ${id} deletado!`)
    }

    return (
        <>
            <input
                type="text"
                name=""
                id=""
                placeholder="Pesquisa por região"
                onChange={(e) => setPesquisa(e.target.value)} />

            {cardOferta.map((oferta) => (
                <div
                    className="card-Oferta"
                    key={oferta.id}
                    value={oferta.id}>
                    <img src={oferta.imagem} alt="Imagem Curso" className="instituicao" />
                    <h2>{oferta.curso}</h2>
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

                    {lixeira ? (
                        <div
                            className="lixeira"
                            onClick={() => setModal(oferta.id)}>

                            <i className="fa-solid fa-trash-can" />
                        </div>
                    ) : ""}

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