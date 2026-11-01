import "./cardInfo.scss";

export default function CardInfo({
    grupo = "solid",
    icone,
    titulo,
    mensagem
}) {
    return (
        <article className="valor-item">
            <div className="valor-icone roxo">
                <i className={`fa-${grupo} fa-${icone}`} />
            </div>

            <div className="valor-conteudo">
                <h3>{titulo}</h3>
                <p>{mensagem}</p>
            </div>
        </article>
    )
}