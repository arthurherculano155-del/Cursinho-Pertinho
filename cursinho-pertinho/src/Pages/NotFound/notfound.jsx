import "./notfound.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="nao-encontrado">
            <h1>4<img src="/Assets/Imgs/LogoCursinho.png" alt="Imagem Cursinho"/>4</h1>
            <div className="mensagem-nao-encontrado">
                <h2>Ops! Parece que essa página saiu da sala de aula :(</h2>
                <p>Parece que a página que você tentou acessar não existe ou foi removida Mas não se preocupe, você pode voltar para a página inicial e explorar e continuar explorando as oportunidades.</p>

                <Link to="/"><i className="fa-solid fa-house" /> Voltar para a página inicial</Link>
            </div>
        </main>
    );
}