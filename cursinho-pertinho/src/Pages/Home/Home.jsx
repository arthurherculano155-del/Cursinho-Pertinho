import Menu from '../../Components/Shared/Menu/menu';
import './Home.scss';


export default function Home() {
  return (
    <>
      <Menu />



<div className="div-mulher">


<div>
  <h1 className='Titulo'>ENCONTRE O CURSO IDEAL  <br /><b>PERTO DE VOCÊ</b></h1>

 <p>Cursos presenciais e online, de diversas áreas, com horários, <br/> preços e níveis para você  se qualificar sem complicação.</p>
  
 
  <img className='Mulher' src="/Assets/imgs/Mulher.png" alt="Mulher" />

</div>

  <input type="text" placeholder="         Qual curso você deseja encontrar?"   required />
  <img className='Lupa' src="/Assets/imgs/lupinha.svg" alt="Lupa" />
  <a className='buscar' href="">Buscar Cursos</a>


<div className='cards'>
<a className='card1' href="/cursos"> 
  <img
    className='imagem'
    src="/Assets/Imgs/computador.svg"
    alt="Presencial"
  /> Presencial
</a>

<a className='card2' href="/cursos"> 
  <img
    className='imagem'
    src="/Assets/Imgs/wifi.svg"
    alt="Presencial"
  /> Online
</a>

<a className='card3' href="/cursos"> 
  <img
    className='imagem'
    src="/Assets/Imgs/dinheiro.svg"
    alt="Presencial"
  /> Gratuito
</a>

<a className='card4' href="/cursos"> 
  <img
    className='imagem'
    src="/Assets/Imgs/dinheiro.svg"
    alt="Presencial"
  /> Até R$500
</a>

<a className='card5' href="/cursos"> 
  <img
    className='imagem'
    src="/Assets/Imgs/calendario.svg"
    alt="Presencial"
  /> Hoje
</a>


<a className='card6' href="/cursos"> 
  <img
    className='imagem'
    src="/Assets/Imgs/calendario.svg"
    alt="Presencial"
  /> Este fim de semana
</a>


</div>

</div>



    </>
  );
}

