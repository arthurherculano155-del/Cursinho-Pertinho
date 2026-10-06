import { useEffect, useState } from "react";
import DashboardMenu from "../../../Components/Shared/MenuDashboard/menuDash.jsx";
import CardOferta from "../../../Components/Shared/Card-Oferta/cardOferta.jsx";
import "./Postar.scss";

export default function PostarCursos() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const API_URL = "https://cursinhopertinho-api.onrender.com";

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

    useEffect(() => {
        async function BuscarCursos() {
            const resposta = await fetch(`${API_URL}/cursos`);

            const dados = await resposta.json();

            setListaCursos(dados);
        }

        BuscarCursos();
    }, []);

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

    async function BuscarUnidades(regiao) {
        const resposta = await fetch(`${API_URL}/unidades/${regiao}`);

        const dados = await resposta.json();

        setListaUnidades(dados);
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
                <CardOferta />
            </section>
        </>
    );
}