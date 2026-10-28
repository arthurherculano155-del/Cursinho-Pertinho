import './cardTecnologia.scss';

export default function CardTecnologia({
    icone,
    titulo,
    mensagem
}) {
    return (
        <article className='Tecnologia'>
            <i className={`fa-solid fa-${icone}`} />

            <h1 className='Tecnologia-Titulo'>
                {titulo}
            </h1>

            <p className='Tecnologia-Mensagem'>
                {mensagem}
            </p>
        </article>
    )
}