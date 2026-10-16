
import { Link } from 'react-router-dom';
import Menu from '../../Components/Shared/Menu/menu';
import CardInicio from '../../Components/HomeComponents/CardInicio/cardInicio.jsx';
import './Home.scss';

export default function Home() {
    return (
        <>
            <Menu />

            <main className="Hero-Section">
                <img
                    className="Mulher-Cursinho"
                    src="/Assets/Imgs/Mulher-Cursinho.png"
                    alt=""
                    aria-hidden="true"
                />

                <div className="Hero-Msg">
                    <h1 className="Titulo">
                        Encontre o curso ideal
                        <br />
                        <span>perto de você</span>
                    </h1>

                    <p>
                        Cursos presenciais e online, de diversas áreas, com horários,
                        <br />
                        preços e níveis para você se qualificar sem complicação
                    </p>
                </div>

                <div className="Pesquisa-Home">
                    <i className="fa-solid fa-magnifying-glass" />

                    <input
                        type="text"
                        placeholder="Qual curso você quer encontrar?"
                        aria-label="Qual curso você quer encontrar?"
                    />

                    <Link className="buscar" to="/explorar-cursos">
                        Buscar cursos
                    </Link>
                </div>

                <section className="Card-Home-Section">
                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-laptop"
                        modalidade="Presencial"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-wifi"
                        modalidade="Online"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-tag"
                        modalidade="Gratuito"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-money-bill"
                        modalidade="Até R$ 100"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-solid"
                        icone="fa-seedling"
                        modalidade="Nível Iniciante"
                    />

                    <CardInicio
                        referencia="/explorar-cursos"
                        grupo="fa-regular"
                        icone="fa-clock"
                        modalidade="Curta duração"
                    />
                </section>
            </main>
        </>
    );
}