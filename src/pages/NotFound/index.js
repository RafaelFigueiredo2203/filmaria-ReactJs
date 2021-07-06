import { Link } from 'react-router-dom';
import './notfound.css';

export default function NotFound(){
    return(
      <div className="bd">
        <h1 className="err">404</h1>
        <h2>Page Not Found</h2>
        <div className="btn-rgb">
        <Link  to="/"><span>Voltar a Home</span></Link>
        </div>
      </div>
    );
}