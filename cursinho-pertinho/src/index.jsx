import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './index.scss';
import Rotas from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Rotas />
);