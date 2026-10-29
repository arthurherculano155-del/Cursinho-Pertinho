import { useEffect, useState } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker,
    Polyline,
    useMap
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

function CentralizarMapa({ localizacao }) {
    const mapa = useMap();

    useEffect(() => {
        if (localizacao) {
            mapa.flyTo(
                [localizacao.latitude, localizacao.longitude],
                14,
                { duration: 1.5 }
            );
        }
    }, [localizacao, mapa]);

    return null;
}

function EnquadrarRota({ rota }) {
    const mapa = useMap();

    useEffect(() => {
        if (rota?.coordenadas?.length) {
            mapa.fitBounds(rota.coordenadas, {
                padding: [40, 40],
                maxZoom: 15,
                animate: true
            });
        }
    }, [rota, mapa]);

    return null;
}

function formatarDistancia(metros) {
    return `${(metros / 1000).toLocaleString('pt-BR', {
        maximumFractionDigits: 1
    })} km`;
}

function formatarDuracao(segundos) {
    const minutos = Math.round(segundos / 60);

    if (minutos < 60) {
        return `${Math.max(1, minutos)} min`;
    }

    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return minutosRestantes === 0
        ? `${horas} h`
        : `${horas} h ${minutosRestantes} min`;
}

function gerarLinkTransporte(origem, destino, modalidade) {
    const parametros = new URLSearchParams({
        api: '1',
        origin: `${origem.latitude},${origem.longitude}`,
        destination: `${destino.latitude},${destino.longitude}`,
        travelmode: 'transit',
        transit_mode: modalidade
    });

    return `https://www.google.com/maps/dir/?${parametros.toString()}`;
}

export default function MapaUnidades() {
    const [unidades, setUnidades] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const [localizacao, setLocalizacao] = useState(null);
    const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);
    const [erroLocalizacao, setErroLocalizacao] = useState('');

    const [rota, setRota] = useState(null);
    const [carregandoRota, setCarregandoRota] = useState(false);
    const [erroRota, setErroRota] = useState('');
    const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);

    useEffect(() => {
        const controlador = new AbortController();

        async function buscarUnidades() {
            try {
                setCarregando(true);
                setErro('');

                const resposta = await fetch(`${API_URL}/unidades`, {
                    signal: controlador.signal
                });

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
                if (err.name === 'AbortError') return;

                console.error('Erro ao carregar unidades:', err);
                setErro('Não foi possível carregar as unidades.');
            } finally {
                if (!controlador.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        buscarUnidades();

        return () => controlador.abort();
    }, []);

    function mostrarMinhaLocalizacao() {
        if (!navigator.geolocation) {
            setErroLocalizacao(
                'Seu navegador não oferece suporte à localização.'
            );
            return;
        }

        setCarregandoLocalizacao(true);
        setErroLocalizacao('');

        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                setLocalizacao({
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                });

                setCarregandoLocalizacao(false);
            },
            (erro) => {
                const mensagens = {
                    1: 'Permita o acesso à localização nas configurações do navegador.',
                    2: 'Não foi possível determinar sua localização.',
                    3: 'A localização demorou demais. Tente novamente.'
                };

                setErroLocalizacao(
                    mensagens[erro.code] ||
                    'Não foi possível obter sua localização.'
                );

                setCarregandoLocalizacao(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 30000
            }
        );
    }

    async function calcularRota(unidade) {
        if (!localizacao) {
            setErroRota(
                'Obtenha sua localização antes de calcular a rota.'
            );
            return;
        }

        setCarregandoRota(true);
        setErroRota('');
        setRota(null);
        setUnidadeSelecionada(unidade);

        try {
            const origem =
                `${localizacao.longitude},${localizacao.latitude}`;

            const destino =
                `${Number(unidade.longitude)},${Number(unidade.latitude)}`;

            const resposta = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${origem};${destino}?overview=full&geometries=geojson`
            );

            if (!resposta.ok) {
                throw new Error(
                    'Não foi possível consultar o serviço de rotas.'
                );
            }

            const dados = await resposta.json();

            if (dados.code !== 'Ok' || !dados.routes?.length) {
                throw new Error(
                    'Não foi encontrada uma rota para essa unidade.'
                );
            }

            const melhorRota = dados.routes[0];

            setRota({
                coordenadas: melhorRota.geometry.coordinates.map(
                    ([longitude, latitude]) => [latitude, longitude]
                ),
                distancia: melhorRota.distance,
                duracao: melhorRota.duration
            });
        } catch (err) {
            console.error('Erro ao calcular rota:', err);
            setErroRota(
                err.message || 'Ocorreu um erro ao calcular a rota.'
            );
        } finally {
            setCarregandoRota(false);
        }
    }

    function limparRota() {
        setRota(null);
        setUnidadeSelecionada(null);
        setErroRota('');
    }

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

    const linkOnibus =
        localizacao && unidadeSelecionada
            ? gerarLinkTransporte(
                localizacao,
                {
                    latitude: Number(unidadeSelecionada.latitude),
                    longitude: Number(unidadeSelecionada.longitude)
                },
                'bus'
            )
            : null;

    const linkMetro =
        localizacao && unidadeSelecionada
            ? gerarLinkTransporte(
                localizacao,
                {
                    latitude: Number(unidadeSelecionada.latitude),
                    longitude: Number(unidadeSelecionada.longitude)
                },
                'subway'
            )
            : null;

    const linkTransportePublico =
        localizacao && unidadeSelecionada
            ? gerarLinkTransporte(
                localizacao,
                {
                    latitude: Number(unidadeSelecionada.latitude),
                    longitude: Number(unidadeSelecionada.longitude)
                },
                'bus|subway|train|tram|rail'
            )
            : null;

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
                <span className="etiqueta-mapa">
                    <i className="fa-solid fa-location-dot"></i>
                    Encontre sua próxima oportunidade
                </span>

                <h2>
                    Encontre cursos <span>perto de você</span>
                </h2>

                <p>
                    Explore as instituições cadastradas e descubra
                    como chegar até a unidade do curso que você procura.
                </p>
            </div>

            <div className="acoes-mapa">
                <button
                    type="button"
                    className="botao-minha-localizacao"
                    onClick={mostrarMinhaLocalizacao}
                    disabled={carregandoLocalizacao}
                >
                    <i className="fa-solid fa-location-crosshairs"></i>

                    {carregandoLocalizacao
                        ? 'Obtendo localização...'
                        : 'Mostrar minha localização'}
                </button>

                {erroLocalizacao && (
                    <p className="erro-localizacao" role="alert">
                        {erroLocalizacao}
                    </p>
                )}
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

                <CentralizarMapa localizacao={localizacao} />

                {rota && (
                    <>
                        <EnquadrarRota rota={rota} />

                        <Polyline
                            positions={rota.coordenadas}
                            pathOptions={{
                                color: '#2475F5',
                                weight: 6,
                                opacity: 0.85,
                                lineCap: 'round',
                                lineJoin: 'round'
                            }}
                        />
                    </>
                )}

                {localizacao && (
                    <CircleMarker
                        center={[
                            localizacao.latitude,
                            localizacao.longitude
                        ]}
                        radius={10}
                        pathOptions={{
                            color: '#FFFFFF',
                            weight: 3,
                            fillColor: '#2475F5',
                            fillOpacity: 1
                        }}
                    >
                        <Popup>
                            <div className="popup-unidade">
                                <h3>Você está aqui!</h3>
                                <p>Sua localização atual.</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                )}

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

                                <button
                                    type="button"
                                    className="botao-tracar-rota"
                                    onClick={() => calcularRota(unidade)}
                                    disabled={carregandoRota}
                                >
                                    <i className="fa-solid fa-route"></i>

                                    {carregandoRota &&
                                    unidadeSelecionada?.id_unidade === unidade.id_unidade
                                        ? 'Calculando rota...'
                                        : 'Traçar rota de carro'}
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {erroRota && (
                <p className="erro-localizacao" role="alert">
                    {erroRota}
                </p>
            )}

            {rota && unidadeSelecionada && (
                <div className="resumo-rota">
                    <h3>
                        <i className="fa-solid fa-route"></i>
                        Como chegar até {unidadeSelecionada.unidade}
                    </h3>

                    <div className="dados-rota">
                        <p>
                            <i className="fa-solid fa-car"></i>
                            <strong>Carro:</strong>{' '}
                            {formatarDistancia(rota.distancia)} ·{' '}
                            {formatarDuracao(rota.duracao)}
                        </p>
                    </div>

                    <p>
                        Consulte abaixo os trajetos de transporte público
                        e os horários estimados disponíveis.
                    </p>

                    <div className="opcoes-transporte">
                        <a
                            className="botao-tracar-rota"
                            href={linkOnibus}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-solid fa-bus"></i>
                            Ver rota de ônibus
                        </a>

                        <a
                            className="botao-tracar-rota"
                            href={linkMetro}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-solid fa-train-subway"></i>
                            Ver rota de metrô
                        </a>

                        <a
                            className="botao-tracar-rota"
                            href={linkTransportePublico}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-solid fa-route"></i>
                            Comparar transporte público
                        </a>
                    </div>

                    <button
                        type="button"
                        className="botao-limpar-rota"
                        onClick={limparRota}
                    >
                        <i className="fa-solid fa-xmark"></i>
                        Limpar rota
                    </button>
                </div>
            )}

            <p className="quantidade-unidades">
                <i className="fa-solid fa-map-location-dot"></i>
                {unidadesValidas.length}{' '}
                {unidadesValidas.length === 1
                    ? 'unidade exibida'
                    : 'unidades exibidas'} no mapa
            </p>
        </section>
    );
}