import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../axiosConfig';

function YandexMap() {
    const mapRef = useRef(null);
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSpots = async () => {
            try {
                const response = await axiosInstance.get('/parking/map');
                setSpots(response.data.data);
            } catch (error) {
                console.error('Ошибка загрузки парковок:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSpots();
    }, []);

    useEffect(() => {
        if (loading || spots.length === 0) return;

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
                    center: [55.751574, 37.573856],
                    zoom: 10,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                spots.forEach((spot) => {
                    const placemark = new window.ymaps.Placemark(
                        [spot.lat, spot.lon],
                        {
                            balloonContentHeader: spot.name,
                            balloonContentBody: `
                                <strong>Адрес:</strong> ${spot.address}<br/>
                                <strong>Всего мест:</strong> ${spot.total_spots}<br/>
                                <strong>Свободно:</strong> ${spot.free_spots || 0}<br/>
                                <strong>Занято:</strong> ${spot.occupied_spots || 0}
                            `,
                            balloonContentFooter: '<i>CarSharing</i>',
                            hintContent: spot.name,
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

    if (loading) return <div className="text-center mt-5">Загрузка карты...</div>;

    return (
        <section aria-label="Карта парковок">
            <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
        </section>
    );
}

export default YandexMap;