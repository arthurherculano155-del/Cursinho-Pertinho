import DashboardMenu from "../../../Components/Shared/MenuDashboard/menuDash";
import "./usuarios.scss"
import { useState, useEffect } from "react";

export default function Usuarios() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const API_URL = `https://cursinhopertinho-api.onrender.com`;

    const [usuarios, setUsuarios] = useState([]);
    const [pesquisaUser, setPesquisaUser] = useState("");

    async function apagarUsuario(id) {
        const token = localStorage.getItem("token");

        const resposta = await fetch(`${API_URL}/usuario/deletar/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro)
            return;
        }

        alert(`Usuários deletados: ${dados.Linhas_Alteradas}`);
    
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    async function mudarCargo(email) {
        const token = localStorage.getItem("token");

        const resposta = await fetch(`${API_URL}/usuario`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email
            })
        })

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro)
            return;
        }

        if (usuario.email === email) {
            const usuarioAtualizado = {
                ...usuario,
                cargo: dados.cargo
            }

            localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado))
        }

        alert(`Cargo de ${email} alterado com sucesso!`)

        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    useEffect(() => {
        async function getUsers() {
            const resposta = await fetch(`https://cursinhopertinho-api.onrender.com/usuario?email=${encodeURIComponent(pesquisaUser)}`)

            const dados = await resposta.json();

            setUsuarios(dados)
        }

        getUsers();
    }, [pesquisaUser])

    if (!usuario) {
        return <h1>Você precisa estar logado.</h1>
    }

    if (usuario.cargo !== "admin") {
        return <h1>Você não tem permissão para acessar essa página.</h1>
    }

    return (
        <>
            <DashboardMenu />
            <input
                type="text"
                className="pesquisa-usuarios"
                name=""
                id=""
                value={pesquisaUser}
                onChange={
                    (e) => setPesquisaUser(e.target.value)
                }
                placeholder="Pesquisa por email" />

            <section className="usuarios">
                {usuarios.map((usuario) => (
                    <div
                        className="usuario"
                        key={usuario.id_usuario}>
                        <img src={usuario.imagem_url || "/Assets/Imgs/usuario-padrao.webp"}
                            alt={usuario.nome.charAt(0).toUpperCase()}
                            className="userImg"
                        />
                        <h3>Nome: {usuario.nome}</h3>
                        <h3>Email: {usuario.email}</h3>
                        <h3>Cargo: {usuario.cargo}</h3>

                        <i
                            className={
                                usuario.cargo === "admin" ?
                                    "fa-solid fa-xmark" :
                                    "fa-solid fa-exchange-alt"}

                            onClick={() => {
                                mudarCargo(usuario.email)
                            }}
                        />

                        {usuario.cargo === "admin" ?
                        ("") : <i
                            className="fa-solid fa-trash-can"
                            onClick={
                                () => apagarUsuario(usuario.id_usuario)
                            }
                        />}
                    </div>
                ))}

                
            </section>
        </>
    )
}