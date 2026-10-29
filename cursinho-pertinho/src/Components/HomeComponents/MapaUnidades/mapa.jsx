import { useEffect, useState } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet';

import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import './mapa.scss';

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow
});

const API_URL = 'https://cursinhopertinho-api.onrender.com';

export default function MapaUnidades() {
    const [unidades, setUnidades] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function buscarUnidades() {
            try {
                setCarregando(true);
                setErro('');

                const resposta = await fetch(
                    `${API_URL}/unidades`
                );

                if (!resposta.ok) {
                    throw new Error(
                        `Erro ao consultar a API: ${resposta.status}`
                    );
                }

                const dados = await resposta.json();

                if (!Array.isArray(dados)) {
                    throw new Error(
                        'A API não retornou uma lista de unidades.'
                    );
                }

                setUnidades(dados);
            } catch (err) {
                console.error(
                    'Erro ao carregar unidades:',
                    err
                );

                setErro(
                    'Não foi possível carregar as unidades. Verifique se a API está funcionando.'
                );
            } finally {
                setCarregando(false);
            }
        }

        buscarUnidades();
    }, []);

    const unidadesValidas = unidades.filter((unidade) => {
        const latitude = Number(unidade.latitude);
        const longitude = Number(unidade.longitude);

        return (
            unidade.latitude !== null &&
            unidade.latitude !== '' &&
            unidade.longitude !== null &&
            unidade.longitude !== '' &&
            Number.isFinite(latitude) &&
            Number.isFinite(longitude) &&
            latitude >= -90 &&
            latitude <= 90 &&
            longitude >= -180 &&
            longitude <= 180 &&
            unidade.endereco?.toLowerCase() !== 'online'
        );
    });

    if (carregando) {
        return (
            <div className="mapa-status">
                Carregando unidades...
            </div>
        );
    }

    if (erro) {
        return (
            <div className="mapa-status mapa-erro">
                {erro}
            </div>
        );
    }

    if (unidadesValidas.length === 0) {
        return (
            <div className="mapa-status">
                Nenhuma unidade com coordenadas cadastradas.
            </div>
        );
    }

    return (
        <section className="secao-mapa">
            <div className="cabecalho-mapa">
                <h2>Encontre cursos perto de você</h2>

                <p>
                    Explore as instituições e unidades
                    cadastradas no CursinhoPertinho.
                </p>
            </div>

            <MapContainer
                center={[-23.5505, -46.6333]}
                zoom={10}
                scrollWheelZoom={true}
                className="mapa-unidades"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {unidadesValidas.map((unidade) => (
                    <Marker
                        key={unidade.id_unidade}
                        position={[
                            Number(unidade.latitude),
                            Number(unidade.longitude)
                        ]}
                    >
                        <Popup>
                            <div className="popup-unidade">
                                <h3>{unidade.unidade}</h3>

                                <p>
                                    <strong>Instituição:</strong>{' '}
                                    {unidade.instituicao}
                                </p>

                                <p>
                                    <strong>Endereço:</strong>{' '}
                                    {[
                                        unidade.endereco,
                                        unidade.numero,
                                        unidade.bairro,
                                        unidade.cep
                                    ]
                                        .filter(Boolean)
                                        .join(', ')}
                                </p>

                                <p>
                                    <strong>Região:</strong>{' '}
                                    {unidade.regiao}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <p className="quantidade-unidades">
                {unidadesValidas.length}{' '}
                {unidadesValidas.length === 1
                    ? 'unidade exibida'
                    : 'unidades exibidas'} no mapa
            </p>
        </section>
    );
}