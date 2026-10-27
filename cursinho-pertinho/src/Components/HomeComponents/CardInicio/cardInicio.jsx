import './cardInicio.scss';
import { Link } from 'react-router-dom';

export default function CardInicio({
    referencia,
    grupo,
    icone,
    modalidade,
    onClick
}) {
    return (
        <div className='Card-Home'>
            {onClick ? (
                <button
                    type="button"
                    className="Link-Card-Home"
                    onClick={onClick}
                >
                    <i className={`${grupo} ${icone}`} />
                    {modalidade}
                </button>
            ) : (
                <Link
                    className='Link-Card-Home'
                    to={referencia}
                >
                    <i className={`${grupo} ${icone}`} />
                    {modalidade}
                </Link>
            )}
        </div>
    );
}