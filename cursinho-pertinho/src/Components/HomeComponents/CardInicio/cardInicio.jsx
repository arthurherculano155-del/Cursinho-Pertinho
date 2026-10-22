import './cardInicio.scss';
import { Link } from 'react-router-dom';

export default function CardInicio({
    referencia,
    grupo,
    icone,
    modalidade
}) {
    return (
        <div className='Card-Home'>
            <Link
                className='Link-Card-Home'
                to={referencia}>
                <i className={`${grupo} ${icone}`} />
                {modalidade}
            </Link>
        </div>
    )
}