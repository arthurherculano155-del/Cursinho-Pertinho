import { useEffect, useState } from "react";
import DashboardMenu from "../../../Components/Shared/MenuDashboard/menuDash.jsx";
import "./Postar.scss";

export default function PostarCursos() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const API_URL = "https://cursinhopertinho-api.onrender.com";

    const [modal, setModal] = useState(null)

    const [listaCursos, setListaCursos] = useState([]);
    const [listaUnidades, setListaUnidades] = useState([]);

    const [curso, setCurso] = useState("");
    const [regiao, setRegiao] = useState("");
    const [unidade, setUnidade] = useState("");
    const [nivel, setNivel] = useState("");
    const [preco, setPreco] = useState("");
    const [carga, setCarga] = useState("");
    const [modalidade, setModalidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const [link, setLink] = useState("");
    const [imagem, setImagem] = useState("");

    const [cardOferta, setCardOferta] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        async function BuscarCursos() {
            const resposta = await fetch(`${API_URL}/cursos`);

            const dados = await resposta.json();

            setListaCursos(dados);
        }

        BuscarCursos();
    }, []);



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

    async function BuscarUnidades(regiao) {
        const resposta = await fetch(`${API_URL}/unidades/${regiao}`);

        const dados = await resposta.json();

        setListaUnidades(dados);
    }

    async function PostarCursinho(e) {
        e.preventDefault();

        const resposta = await fetch(`${API_URL}/cursos`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id_curso: Number(curso),
                id_unidade: Number(unidade),
                nivel: nivel,
                preco: Number(preco),
                carga_horaria: Number(carga),
                modalidade: modalidade,
                descricao: descricao,
                link_inscricao: link,
                imagem: imagem
            })
        });

        const dados = await resposta.json();

        alert(`Curso publicado com ID ${dados.id_oferta}`);

        setCurso("");
        setRegiao("");
        setUnidade("");
        setNivel("");
        setPreco("");
        setCarga("");
        setModalidade("");
        setDescricao("");
        setImagem("");
        setLink("");

        setListaUnidades([]);

        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    if (!usuario) {
        return <h1>Você precisa estar logado.</h1>;
    }

    if (usuario.cargo !== "admin") {
        return <h1>Você não tem permissão para acessar esta página.</h1>;
    }

    return (
        <>
            <DashboardMenu />
            <h1>Postar Curso:</h1>

            <main className="formulario">
                <form
                    className="postar"
                    onSubmit={PostarCursinho}
                >

                    <select
                        id="selectCurso"
                        required
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                    >
                        <option value="">
                            Escolha um curso
                        </option>

                        {listaCursos.map((curso) => (
                            <option
                                value={curso.id_curso}
                                key={curso.id_curso}
                            >
                                {curso.nome}
                            </option>
                        ))}
                    </select>


                    <select
                        required
                        value={regiao}
                        onChange={(e) => {
                            const novaRegiao = e.target.value;

                            setRegiao(novaRegiao);
                            setUnidade("");

                            if (novaRegiao) {
                                BuscarUnidades(novaRegiao);
                            }
                            else {
                                setListaUnidades([]);
                            }
                        }}
                    >
                        <option value="">
                            Escolha uma região
                        </option>

                        <option value="1">Zona Sul</option>
                        <option value="2">Zona Norte</option>
                        <option value="3">Zona Leste</option>
                        <option value="4">Zona Oeste</option>
                        <option value="5">Centro</option>
                    </select>


                    <select
                        required
                        value={unidade}
                        onChange={(e) => setUnidade(e.target.value)}
                    >
                        <option value="">
                            Escolha uma unidade
                        </option>

                        {listaUnidades.map((unidades) => (
                            <option
                                value={unidades.id_unidade}
                                key={unidades.id_unidade}
                            >
                                {unidades.unidade}
                            </option>
                        ))}
                    </select>


                    <select
                        required
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                    >
                        <option value="">
                            Escolha um nível
                        </option>

                        <option value="Iniciante">
                            Iniciante
                        </option>

                        <option value="Intermediário">
                            Intermediário
                        </option>

                        <option value="Avançado">
                            Avançado
                        </option>
                    </select>


                    <input
                        type="number"
                        required
                        placeholder="Preço do Curso"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />


                    <input
                        type="number"
                        required
                        placeholder="Carga horária (horas)"
                        value={carga}
                        onChange={(e) => setCarga(e.target.value)}
                    />


                    <select
                        required
                        value={modalidade}
                        onChange={(e) =>
                            setModalidade(e.target.value)
                        }
                    >
                        <option value="">
                            Escolha uma Modalidade
                        </option>

                        <option value="Presencial">
                            Presencial
                        </option>

                        <option value="Online">
                            Online
                        </option>

                        <option value="Híbrido">
                            Híbrido
                        </option>
                    </select>

                    <input
                        type="text"
                        placeholder="URL da imagem"
                        required
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                    />


                    <input
                        type="text"
                        required
                        placeholder="Descrição do curso"
                        value={descricao}
                        onChange={(e) =>
                            setDescricao(e.target.value)
                        }
                    />


                    <input
                        type="text"
                        required
                        placeholder="Link de Inscrição"
                        value={link}
                        onChange={(e) =>
                            setLink(e.target.value)
                        }
                    />


                    <input
                        type="submit"
                        value="Postar Cursinho"
                    />

                </form>
            </main>

            <section className="cards-oferta">
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
                        <img src={oferta.imagem} alt="Imagem Curso" />
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

                        <div
                            className="lixeira"
                            onClick={() => setModal(oferta.id)}
                        >
                            <i className="fa-solid fa-trash-can" />
                        </div>

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
                ))}
            </section>
        </>
    );
}