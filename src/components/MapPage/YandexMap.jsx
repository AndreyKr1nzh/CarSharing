import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';

function YandexMap() {
    const mapRef = useRef(null);
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSpots = async () => {
            try {
                const response = await axiosInstance.get('/parking/map');
                setSpots(response.data.data || []);
            } catch (error) {
                console.error('Ошибка загрузки парковок:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSpots();
    }, []);

    useEffect(() => {
        if (loading) return;

        const loadYandexMaps = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = `https://api-maps.yandex.ru/2.1/?apikey=e0109821-ef12-47c8-b417-6cba3e2863b3&lang=ru_RU`;
                script.onload = resolve;
                document.head.appendChild(script);
            });
        };

        const initMap = async () => {
            await loadYandexMaps();
            
            window.ymaps.ready(() => {
                const map = new window.ymaps.Map(mapRef.current, {
                    center: [56.1459, 40.4214],
                    zoom: 12,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                spots.forEach((spot) => {
                    const freeSpots = spot.free_spots || 0;
                    const totalSpots = spot.total_spots;
                    
                    const placemark = new window.ymaps.Placemark(
                        [spot.lat, spot.lon],
                        {
                            balloonContentHeader: spot.name,
                            balloonContentBody: `
                                <strong>Адрес:</strong> ${spot.address}<br/>
                                <strong>Всего мест:</strong> ${totalSpots}<br/>
                                <strong>Свободно:</strong> ${freeSpots}<br/>
                                <strong>Занято:</strong> ${totalSpots - freeSpots}
                            `,
                            balloonContentFooter: '<i>CarSharing</i>',
                            hintContent: `${spot.name} (свободно: ${freeSpots})`,
                        },
                        {
                            preset: 'islands#blueIcon',
                        }
                    );
                    map.geoObjects.add(placemark);
                });
            });
        };

        initMap();
    }, [loading, spots]);

    if (loading) {
        return (
            <section className="text-center mt-5" aria-label="Загрузка карты">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Загрузка карты...</p>
            </section>
        );
    }

    return (
        <section aria-label="Интерактивная карта парковок">
            <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
        </section>
    );
}

export default YandexMap;