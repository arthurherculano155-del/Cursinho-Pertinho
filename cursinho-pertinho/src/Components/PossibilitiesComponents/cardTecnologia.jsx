
import './cardTecnologia.scss';

export default function CardTecnologia({
    icone,
    titulo,
    mensagem,
    imagem
}) {
    return (
        <article className="Tecnologia">
            <div className="Tecnologia-Icone">
                <i className={`fa-solid fa-${icone}`} aria-hidden="true" />
            </div>

            <div className="Tecnologia-Conteudo">
                <h3 className="Tecnologia-Titulo">
                    {titulo}
                </h3>

                <p className="Tecnologia-Mensagem">
                    {mensagem}
                </p>
            </div>

            {imagem && (
                <div className="Tecnologia-Visual">
                    <img
                        src={imagem}
                        alt={titulo}
                        className="Tecnologia-Imagem"
                    />
                </div>
            )}
        </article>
    );
}