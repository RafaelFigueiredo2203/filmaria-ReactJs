import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Filme from "../Filme";
import './favoritos.css';
import { toast } from "react-toastify";

export default function Favoritos(){
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('filmes');
    setFilmes(JSON.parse(minhaLista) || []);

  },[]);

  function handelDelete(id){
    let filtroFilmes =  filmes.filter((item) => {
      return (item.id !== id)
    })

   setFilmes(filtroFilmes); 
   localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
   toast.info('🔔 Filme excluido com sucesso!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  }

  return(
    <div id="meus-filmes">
      <h1>Meus Filmes</h1>
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}> 
              <span>{item.nome}</span>

              <div>
                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                <button onClick={ () => handelDelete(item.id) }>Excluir</button>
                <hr/>
              </div>
            </li>
            
          )
        })}
      </ul>
    </div>
  );
}