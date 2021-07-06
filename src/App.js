import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import './style.css';



function App() {
  return (
    <div className="app">
     <Routes/>
     <ToastContainer/>
    </div>
  );
}

export default App;