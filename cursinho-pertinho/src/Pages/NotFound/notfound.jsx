import "./notfound.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="nao-encontrado">
            <h1>ERRO 404 - Não Encontrado</h1>
            <div className="mensagem-nao-encontrado">
                <h2>Ops! Parece que essa página saiu da sala de aula :(</h2>
                <p>Mas relaxa! Você pode voltar à página principal ao clicar no botão abaixo</p>

                <Link to="/">Voltar ao início</Link>
            </div>
        </main>
    );
}