import { useState, useEffect } from "react";
import "./menu.scss";
import { NavLink } from "react-router-dom";

export default function Menu() {
    const API_URL = "https://cursinhopertinho-api.onrender.com";

    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);

    const [personalizacaoModal, setPersonalizacaoModal] = useState(false);

    const [primeiroNome, setPrimeiroNome] = useState("");
    const [perfil, setPerfil] = useState("");

    const [menuMobile, setMenuMobile] = useState(false);
    const [menu, setMenu] = useState(true);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [usuarioLogado, setUsuarioLogado] = useState(null);

    const [emailLogin, setEmailLogin] = useState("");
    const [senhaLogin, setSenhaLogin] = useState("");

    async function cadastrarUsuario() {
        const resposta = await fetch(`${API_URL}/usuario/cadastrar`, {
            method: "POST",
            headers:
                { "Content-type": "application/json" },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                cargo: "usuario"
            })
        })

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro)
            return;
        }

        setNome("");
        setEmail("");
        setSenha("");

        alert(`Cadastro realizado com sucesso, ${nome}!`);
        setSignUp(false)
    }

    async function LogarUsuario() {
        const resposta = await fetch(`${API_URL}/usuario/entrar`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: emailLogin,
                senha: senhaLogin
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro);
            return;
        }

        alert(dados.resultado);

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );

        localStorage.setItem("token", dados.token)

        setUsuarioLogado(dados.usuario);

        setEmailLogin("");
        setSenhaLogin("");

        setLogin(false);
    }

    function sairUsuario() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        setUsuarioLogado(null);
    }

    async function atualizarUsuario(e) {
        e.preventDefault();

        const resposta = await fetch(`${API_URL}/usuario/personalizar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: usuarioLogado.email,
                primeiro_nome: primeiroNome,
                imagem_url: perfil
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro);
            return;
        }

        const usuarioAtualizado = {
            ...usuarioLogado,
            primeiro_nome: primeiroNome,
            imagem_url: perfil
        };

        setUsuarioLogado(usuarioAtualizado);

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuarioAtualizado)
        );

        setPersonalizacaoModal(false);

        alert("Perfil atualizado com sucesso!");
    }

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");

        if (usuario) {
            setUsuarioLogado(JSON.parse(usuario));
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 800px)");

        function verificarTela(evento) {
            const mobile = evento.matches;

            setMenuMobile(mobile);
            setMenu(!mobile);
        }

        verificarTela(media);

        media.addEventListener("change", verificarTela);

        return () => {
            media.removeEventListener("change", verificarTela);
        };
    }, []);

    return (
        <>
            <header className="menu">
                <div className="Start">
                    <img src="../../../Assets/Imgs/LogoCursinho.png" alt="Logo-Menu" />
                    <h2>Cursinho <span>Pertinho</span></h2>
                </div>

                {menuMobile && (
                    <div className="abrir-menu">
                        <i
                            className={menu ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
                            onClick={() => setMenu(!menu)}
                        />
                    </div>
                )}
            </header>

            {menu && (
                <>
                    <ul className="links">
                        <li className="link">
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }>
                                Início
                            </NavLink>
                        </li>

                        <li className="link">
                            <NavLink
                                to='/cursos'
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }>
                                Cursos
                            </NavLink>
                        </li>

                        <li className="link">
                            <NavLink
                                to='/instituições'
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }>
                                Instituições
                            </NavLink>
                        </li>

                        <li className="link">
                            <NavLink
                                to='/sobre'
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }>
                                Sobre
                            </NavLink>
                        </li>
                    </ul>

                    <div className="final">
                        <div className="local">
                            <i className="fa-solid fa-location-dot" />
                            <h3>São Paulo - SP</h3>
                        </div>
                    </div>

                    {usuarioLogado ? (
                        <section className="user">
                            <img
                                src={usuarioLogado.imagem_url || "/Assets/Imgs/usuario-padrao.webp"}
                                alt={usuarioLogado.primeiro_nome.charAt(0).toUpperCase()}
                                className="avatar"
                                onClick={() => setPersonalizacaoModal(true)}
                            />

                            <p>{usuarioLogado.primeiro_nome}</p>

                            <div
                                className="sair"
                                onClick={() => sairUsuario()}>
                                <i className="fa-solid fa-arrow-right-from-bracket" />
                            </div>
                        </section>
                    ) : (
                        <div className="bnts">
                            <button
                                className="login"
                                onClick={() => setLogin(true)}>
                                Entrar
                            </button>

                            <button
                                className="sign-up"
                                onClick={() => setSignUp(true)}>
                                Cadastrar-se
                            </button>
                        </div>
                    )}
                </>
            )}

            {signUp && (
                <div className="fundo">
                    <section className="cadastro">
                        <button
                            className="fechar"
                            onClick={() => setSignUp(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <h1>Cadastre-se</h1>

                        <div className="inputs">
                            <input
                                type="text"
                                required
                                placeholder="Insira seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <input
                                type="text"
                                required
                                placeholder="Insira seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                required
                                placeholder="Crie uma senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />

                            <button onClick={cadastrarUsuario}>
                                Cadastre-se
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {login && (
                <section className="logar">
                    <div className="fundo">
                        <div className="login-container">
                            <button
                                className="fechar"
                                onClick={() => setLogin(false)}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                            <h1>Logar</h1>

                            <div className="informacoes">
                                <input
                                    type="text"
                                    value={emailLogin}
                                    placeholder="Insira seu email"
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                />

                                <input
                                    type="password"
                                    value={senhaLogin}
                                    placeholder="Insira a senha"
                                    onChange={(e) => setSenhaLogin(e.target.value)}
                                />

                                <button
                                    className="log"
                                    onClick={LogarUsuario}
                                >
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {personalizacaoModal && (
                <div className="fundo">
                    <section className="personalizar">
                        <button
                            className="fechar"
                            onClick={() => setPersonalizacaoModal(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <h1>Personalizar</h1>

                        <div className="informacoes">
                            <div className="userInformation">
                                <img
                                    src={usuarioLogado.imagem_url || "/Assets/Imgs/usuario-padrao.webp"}
                                    alt={usuarioLogado.primeiro_nome.charAt(0).toUpperCase()}
                                />

                                <h3>{usuarioLogado.primeiro_nome}</h3>
                                <p>{usuarioLogado.nome}</p>
                                <p>{usuarioLogado.email}</p>
                            </div>

                            <div className="atualizar-informacoes">
                                <form onSubmit={atualizarUsuario}>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={primeiroNome}
                                        placeholder="Como deseja ser chamado?"
                                        onChange={(e) => setPrimeiroNome(e.target.value)}
                                        required
                                    />

                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={perfil}
                                        placeholder="URL da imagem de perfil"
                                        onChange={(e) => setPerfil(e.target.value)}
                                        required
                                    />

                                    <input
                                        type="submit"
                                        value="Atualizar"
                                    />
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}