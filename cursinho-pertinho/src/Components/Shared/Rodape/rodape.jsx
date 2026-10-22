import './rodape.scss';
import { Link } from 'react-router-dom';

export default function Rodape() {
    return (
        <section className='Rodape'>
            
            <article className="Comeco-Rodape">

                <div className="logo-informacoes">
                    <img src="/Assets/Imgs/LogoCursinho.png" alt="" />
                    <h2>Cursinho <span>Pertinho</span></h2>
                </div>

                <div className="rodape-mensagem">
                    <p>O Cursinho Pertinho facilita sua busca pelo curso ideal, ajudando você a encontrar opções próximas de você e explorar oportunidades na área que mais combina com seus interesses!</p>
                </div>

            </article>


            <article className="Rodape-Navegacao">
                <h2>Navegação</h2>

                <Link
                    to="/"
                >
                    <p>Início</p>
                </Link>

                <Link
                    to="/explorar-cursos"
                >
                    <p>Explorar Cursos</p>
                </Link>

                <Link
                    to="/possibilidades"
                >
                    <p>Possibilidades</p>
                </Link>

                <Link
                    to="/sobre"
                >
                    <p>Sobre Nós</p>
                </Link>
            </article>

            <article className="Rodape-Contato">
                <h2>Contato</h2>

                <div className="contato-cursinho">
                    <i className='fa-solid fa-location-dot localizacao' />
                    <p>São Paulo - SP</p>
                </div>

                <div className="contato-cursinho">
                    <i className='fa-regular fa-envelope' />
                    <a
                        href='https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRnXvWHsWGCDZnRsQGGcGbCKBsjzRzNvzMrHzCNkxbpWQxpXDhLZLpvRGRXSZRlnhHzcTql'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <p>cursinhopertinho@gmail.com</p>
                    </a>
                </div>
            </article>

        </section>
    )
}