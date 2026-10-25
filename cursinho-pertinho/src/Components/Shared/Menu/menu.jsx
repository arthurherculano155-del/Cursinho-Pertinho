import { useState, useEffect } from "react";
import "./menu.scss";
import { NavLink } from "react-router-dom";

export default function Menu() {
    const API_URL = "https://cursinhopertinho-api.onrender.com";

    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);
    const [personalizacaoModal, setPersonalizacaoModal] = useState(false);

    const [primeiroNome, setPrimeiroNome] = useState("");
    const [foto, setFoto] = useState(null);
    const [enviandoFoto, setEnviandoFoto] = useState(false);

    const [modalSenha, setModalSenha] = useState(false);
    const [emailRecuperation, setEmailRecuperation] = useState("");

    const [menuMobile, setMenuMobile] = useState(false);
    const [menu, setMenu] = useState(true);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [usuarioLogado, setUsuarioLogado] = useState(null);

    async function cadastrarUsuario(e) {
        e?.preventDefault();

        try {
            const resposta = await fetch(`${API_URL}/usuario/cadastrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    cargo: "usuario"
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro);
                return;
            }

            alert(`Cadastro realizado com sucesso, ${nome}!`);

            setNome("");
            setEmail("");
            setSenha("");
            setSignUp(false);
        } catch (erro) {
            alert("Não foi possível realizar o cadastro. Tente novamente.");
            console.error(erro);
        }
    }

    async function EnviarCodigo() {
        try {
            const resposta = await fetch(`${API_URL}/usuario/enviar-codigo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailRecuperation
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro);
                return;
            }

            alert(dados.resultado);
        } catch (erro) {
            alert("Não foi possível enviar o código. Tente novamente.");
            console.error(erro);
        }
    }

    async function LogarUsuario(e) {
        e?.preventDefault();

        try {
            const resposta = await fetch(`${API_URL}/usuario/entrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    senha
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro);
                return;
            }

            alert(dados.resultado);

            localStorage.setItem("usuario", JSON.stringify(dados.usuario));
            localStorage.setItem("token", dados.token);

            setUsuarioLogado(dados.usuario);
            setEmail("");
            setSenha("");
            setLogin(false);

            window.location.reload();
        } catch (erro) {
            alert("Não foi possível entrar. Tente novamente.");
            console.error(erro);
        }
    }

    function sairUsuario() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        setUsuarioLogado(null);

        window.location.reload();
    }

    function abrirPersonalizacao() {
        setPrimeiroNome(usuarioLogado?.primeiro_nome || "");
        setFoto(null);
        setPersonalizacaoModal(true);
    }

    function fecharPersonalizacao() {
        if (enviandoFoto) return;

        setPersonalizacaoModal(false);
        setFoto(null);
    }

    async function atualizarUsuario(e) {
        e.preventDefault();

        if (!usuarioLogado || enviandoFoto) return;

        const nomeAtualizado = primeiroNome.trim();
        const nomeMudou =
            nomeAtualizado !== (usuarioLogado.primeiro_nome || "");
        const fotoSelecionada = Boolean(foto);

        if (!nomeMudou && !fotoSelecionada) {
            setPersonalizacaoModal(false);
            return;
        }

        setEnviandoFoto(true);

        try {
            let imagemUrl = usuarioLogado.imagem_url || "";

            if (fotoSelecionada) {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error(
                        "Sua sessão expirou. Entre novamente na sua conta."
                    );
                }

                const formData = new FormData();
                formData.append("foto", foto);

                const respostaFoto = await fetch(`${API_URL}/usuario/foto`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                });

                const dadosFoto = await respostaFoto.json();

                if (!respostaFoto.ok) {
                    throw new Error(
                        dadosFoto.erro ||
                        "Não foi possível atualizar a foto."
                    );
                }

                imagemUrl = dadosFoto.imagem_url;
            }

            if (nomeMudou) {
                const token = localStorage.getItem("token");

                const respostaNome = await fetch(
                    `${API_URL}/usuario/personalizar`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            ...(token
                                ? { Authorization: `Bearer ${token}` }
                                : {})
                        },
                        body: JSON.stringify({
                            email: usuarioLogado.email,
                            primeiro_nome: nomeAtualizado,
                            imagem_url: imagemUrl
                        })
                    }
                );

                const dadosNome = await respostaNome.json();

                if (!respostaNome.ok) {
                    throw new Error(
                        dadosNome.erro ||
                        "Não foi possível atualizar o nome."
                    );
                }
            }

            const usuarioAtualizado = {
                ...usuarioLogado,
                primeiro_nome: nomeMudou
                    ? nomeAtualizado
                    : usuarioLogado.primeiro_nome,
                imagem_url: imagemUrl
            };

            setUsuarioLogado(usuarioAtualizado);

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuarioAtualizado)
            );

            setFoto(null);
            setPersonalizacaoModal(false);

            alert("Alterações salvas com sucesso!");
        } catch (erro) {
            alert(erro.message || "Não foi possível salvar as alterações.");
            console.error(erro);
        } finally {
            setEnviandoFoto(false);
        }
    }

    function selecionarFoto(e) {
        const arquivo = e.target.files?.[0] || null;

        if (!arquivo) {
            setFoto(null);
            return;
        }

        const formatosPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!formatosPermitidos.includes(arquivo.type)) {
            alert("Escolha uma imagem JPEG, PNG ou WebP.");
            e.target.value = "";
            setFoto(null);
            return;
        }

        if (arquivo.size > 5 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 5 MB.");
            e.target.value = "";
            setFoto(null);
            return;
        }

        setFoto(arquivo);
    }

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");

        if (usuario) {
            try {
                setUsuarioLogado(JSON.parse(usuario));
            } catch (erro) {
                console.error("Não foi possível carregar o usuário:", erro);
                localStorage.removeItem("usuario");
            }
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

    useEffect(() => {
        const modalAberto =
            signUp ||
            login ||
            personalizacaoModal ||
            modalSenha;

        if (!modalAberto) return;

        function fecharComEscape(e) {
            if (e.key !== "Escape") return;
            if (enviandoFoto) return;

            setSignUp(false);
            setLogin(false);
            setPersonalizacaoModal(false);
            setModalSenha(false);
            setFoto(null);
        }

        window.addEventListener("keydown", fecharComEscape);

        return () => {
            window.removeEventListener("keydown", fecharComEscape);
        };
    }, [
        signUp,
        login,
        personalizacaoModal,
        modalSenha,
        enviandoFoto
    ]);

    return (
        <>
            <header className="menu">
                <div className="Start">
                    <img
                        src="/Assets/Imgs/LogoCursinho.png"
                        alt="Logo do Cursinho Pertinho"
                    />

                    <h2>
                        Cursinho <span>Pertinho</span>
                    </h2>
                </div>

                {menuMobile && (
                    <button
                        type="button"
                        className="abrir-menu"
                        aria-label={menu ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={menu}
                        onClick={() => setMenu(!menu)}
                    >
                        <i
                            className={
                                menu
                                    ? "fa-solid fa-xmark"
                                    : "fa-solid fa-bars"
                            }
                        />
                    </button>
                )}
            </header>

            {menu && (
                <>
                    <ul className="links">
                        <li className="link">
                            <NavLink
                                to="/"
                                end
                                onClick={() => {
                                    if (menuMobile) setMenu(false);
                                }}
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }
                            >
                                Início
                            </NavLink>
                        </li>

                        <li className="link">
                            <NavLink
                                to="/explorar-cursos"
                                onClick={() => {
                                    if (menuMobile) setMenu(false);
                                }}
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }
                            >
                                Explorar Cursos
                            </NavLink>
                        </li>

                        <li className="link">
                            <NavLink
                                to="/possibilidades"
                                onClick={() => {
                                    if (menuMobile) setMenu(false);
                                }}
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }
                            >
                                Possibilidades
                            </NavLink>
                        </li>

                        <li className="link">
                            <NavLink
                                to="/sobre"
                                onClick={() => {
                                    if (menuMobile) setMenu(false);
                                }}
                                className={({ isActive }) =>
                                    isActive ? "Ativo" : ""
                                }
                            >
                                Sobre Nós
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
                            <button
                                type="button"
                                className="avatar-button"
                                aria-label="Personalizar perfil"
                                title="Personalizar perfil"
                                onClick={abrirPersonalizacao}
                            >
                                <img
                                    src={
                                        usuarioLogado.imagem_url ||
                                        "/Assets/Imgs/usuario-padrao.webp"
                                    }
                                    alt=""
                                    className="avatar"
                                />
                            </button>

                            <p>
                                {usuarioLogado.primeiro_nome ||
                                    "Minha conta"}
                            </p>

                            <button
                                type="button"
                                className="sair"
                                aria-label="Sair da conta"
                                onClick={sairUsuario}
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket" />
                            </button>
                        </section>
                    ) : (
                        <div className="bnts">
                            <button
                                type="button"
                                className="login"
                                onClick={() => setLogin(true)}
                            >
                                Entrar
                            </button>

                            <button
                                type="button"
                                className="sign-up"
                                onClick={() => setSignUp(true)}
                            >
                                Cadastrar-se
                            </button>
                        </div>
                    )}
                </>
            )}

            {signUp && (
                <div className="fundo">
                    <section
                        className="cadastro"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-cadastro"
                    >
                        <button
                            className="fechar"
                            type="button"
                            aria-label="Fechar cadastro"
                            onClick={() => setSignUp(false)}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>

                        <h1 id="titulo-cadastro">Cadastre-se</h1>

                        <form className="inputs" onSubmit={cadastrarUsuario}>
                            <input
                                type="text"
                                required
                                autoComplete="name"
                                placeholder="Insira seu nome"
                                value={nome}
                                onChange={(e) =>
                                    setNome(
                                        e.target.value.replace(
                                            /(^|\s)\p{L}/gu,
                                            letra => letra.toUpperCase()
                                        )
                                    )
                                }
                            />

                            <input
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Insira seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                required
                                autoComplete="new-password"
                                placeholder="Crie uma senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />

                            <button type="submit">
                                Cadastrar-se
                            </button>
                        </form>
                    </section>
                </div>
            )}

            {login && (
                <section className="logar">
                    <div className="fundo">
                        <div
                            className="login-container"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="titulo-login"
                        >
                            <button
                                className="fechar"
                                type="button"
                                aria-label="Fechar login"
                                onClick={() => setLogin(false)}
                            >
                                <i className="fa-solid fa-xmark" />
                            </button>

                            <h1 id="titulo-login">Entrar</h1>

                            <form
                                className="informacoes"
                                onSubmit={LogarUsuario}
                            >
                                <input
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    placeholder="Insira seu e-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={senha}
                                    placeholder="Insira sua senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="esqueci-senha"
                                    onClick={() => {
                                        setEmailRecuperation(email);
                                        setModalSenha(true);
                                        setLogin(false);
                                    }}
                                >
                                    Esqueci minha senha
                                </button>

                                <button type="submit" className="log">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            )}

            {personalizacaoModal && usuarioLogado && (
                <div className="fundo">
                    <section
                        className="personalizar"
                    >
                        <button
                            className="fechar"
                            disabled={enviandoFoto}
                            onClick={fecharPersonalizacao}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>

                        <h1 id="titulo-personalizar">Personalizar perfil</h1>

                        <div className="informacoes">
                            <div className="userInformation">
                                <img
                                    src={
                                        foto
                                            ? URL.createObjectURL(foto)
                                            : usuarioLogado.imagem_url ||
                                              "/Assets/Imgs/usuario-padrao.webp"
                                    }
                                    alt={`Foto de ${
                                        usuarioLogado.primeiro_nome || "usuário"
                                    }`}
                                />

                                <h3>
                                    {primeiroNome.trim() ||
                                        usuarioLogado.primeiro_nome ||
                                        "Seu perfil"}
                                </h3>

                                <p>{usuarioLogado.nome}</p>

                                <p>{usuarioLogado.email}</p>
                            </div>

                            <div className="atualizar-informacoes">
                                <form onSubmit={atualizarUsuario}>

                                    <label>
                                            Como deseja ser chamado?
                                    </label>

                                    <input
                                        id="primeiro-nome"
                                        type="text"
                                        autoComplete="given-name"
                                        value={primeiroNome}
                                        placeholder="Como deseja ser chamado?"
                                        onChange={(e) =>
                                            setPrimeiroNome(
                                                e.target.value.replace(
                                                    /(^|\s)\p{L}/gu,
                                                    letra => letra.toUpperCase()
                                                )
                                            )
                                        }
                                    />

                                    <div className="campo-foto">
                                        <label htmlFor="foto-perfil">
                                            Foto de perfil
                                        </label>

                                        <input
                                            type="file"
                                            id="foto-perfil"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={selecionarFoto}
                                        />

                                        {foto && (
                                            <p className="nome-arquivo">
                                                <span>{foto.name}</span>

                                                <button
                                                    type="button"
                                                    aria-label="Remover foto selecionada"
                                                    onClick={() => {
                                                        setFoto(null);

                                                        const campo =
                                                            document.getElementById(
                                                                "foto-perfil"
                                                            );

                                                        if (campo) {
                                                            campo.value = "";
                                                        }
                                                    }}
                                                >
                                                    <i className="fa-solid fa-xmark" />
                                                </button>
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={enviandoFoto}
                                    >
                                        {enviandoFoto
                                            ? "Salvando..."
                                            : "Salvar alterações"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {modalSenha && (
                <section className="fundo">
                    <div
                        className="modal-de-senha"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-recuperacao"
                    >
                        <button
                            className="fechar"
                            type="button"
                            aria-label="Fechar recuperação de senha"
                            onClick={() => setModalSenha(false)}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>

                        <h1 id="titulo-recuperacao">Recuperar senha</h1>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                EnviarCodigo();
                            }}
                        >
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Insira seu e-mail"
                                value={emailRecuperation}
                                onChange={(e) =>
                                    setEmailRecuperation(e.target.value)
                                }
                            />

                            <button type="submit">
                                Enviar código
                            </button>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
}