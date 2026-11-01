import "./indice.scss";

export default function Indice({
    mensagem
}) {
    return (
        <span className="etiqueta-pagina">
            {mensagem.toUpperCase()}
        </span>
    )
}