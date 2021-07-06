import { useEffect, useState } from 'react';
import './filme-info.css';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {ToastContainer, toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';




export default function Filme(){
  const notifyLoading = () => toast.dark('🔔 Carregando seu filme!', {
    position: "top-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyErrorSave = () => toast.error('❌ Você ja possui esse filme salvo!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifySaveSuccess = () => toast.success('🚀 Filme salvo!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  const {id} = useParams();
  const history = useHistory();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    

    async function loadFilme(){
      

      const response = await api.get(`r-api/?api=filmes/${id}`);  

      if(response.data.length === 0){
        // tentou acessar com id que não existe, navego ele pra home
        history.push('/');
        return;  
      }
      //console.log(response.data);
      setFilme(response.data);
      setLoading(false);
    }

    loadFilme();

    return () => {
      console.log('Componente desmontado')
    }
  }, [id, history]);

  function salvaFilme(){

    const minhaLista = localStorage.getItem('filmes');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    //se tiver algum filme igual com id salvo ignorar
    const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id )

    if (hasFilme){
      notifyErrorSave();
      return;
      //para a execução
    }

    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    notifySaveSuccess();
  }

  if(loading){
    notifyLoading();
  }
  
  

  return(
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome}/>

      <h3>Sinopse</h3>
      {filme.sinopse}

      <div>
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
            Trailer
          </a>
        </button>
        
        <button>
          <a target="blank" href={`https://megafilmes.cc/?s=${filme.nome}` }>
            Assistir
          </a>
        </button>
      
         <br/>
         <br/>
       
      </div>
      
    </div>
  );
}