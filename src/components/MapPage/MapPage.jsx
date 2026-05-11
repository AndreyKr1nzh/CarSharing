import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import YandexMap from './YandexMap';
import '../../styles/mapPage.css';

function MapPage() {
    const [spotsCount, setSpotsCount] = useState(0);
    const [carsCount, setCarsCount] = useState(0);

    useEffect(() => {
        setSpotsCount(8);
        setCarsCount(24);
    }, []);

    return (
        <main className="custom-map-container">
            <Container>
                <header className="custom-map-header">
                    <h1 className="custom-map-title">Карта парковок</h1>
                    <p className="custom-map-subtitle">
                        Все наши стоянки на одной карте. Выбирайте удобную локацию и бронируйте авто.
                    </p>
                </header>

                <section className="custom-map-stats" aria-label="Статистика сервиса">
                    <div className="stat-card">
                        <div className="stat-number" aria-label={`${spotsCount} стоянок`}>{spotsCount}+</div>
                        <div className="stat-label">Стоянок</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number" aria-label={`${carsCount} автомобилей`}>{carsCount}+</div>
                        <div className="stat-label">Автомобилей</div>
                    </div>
                </section>

                <section className="custom-map-wrapper" aria-label="Интерактивная карта">
                    <YandexMap />
                </section>

                <section className="custom-map-info" aria-labelledby="map-info-title">
                    <h2 id="map-info-title" className="info-title">
                        Как пользоваться картой?
                    </h2>
                    <div className="info-grid">
                        <article className="info-item">
                            <div className="info-icon" aria-hidden="true">
                                <img src="/images/nav.svg" alt="" />
                            </div>
                            <div className="info-text">
                                <strong>Навигация</strong><br />
                                Приближайте и отдаляйте карту для детального просмотра
                            </div>
                        </article>
                        <article className="info-item">
                            <div className="info-icon" aria-hidden="true">
                                <img src="/images/point.svg" alt="" />
                            </div>
                            <div className="info-text">
                                <strong>Маркеры</strong><br />
                                Синие маркеры обозначают места наших стоянок
                            </div>
                        </article>
                        <article className="info-item">
                            <div className="info-icon" aria-hidden="true">
                                <img src="/images/message.svg" alt="" />
                            </div>
                            <div className="info-text">
                                <strong>Подробности</strong><br />
                                Кликните на маркер, чтобы увидеть адрес и количество мест
                            </div>
                        </article>
                        <article className="info-item">
                            <div className="info-icon" aria-hidden="true">
                                <img src="/images/car.svg" alt="" />
                            </div>
                            <div className="info-text">
                                <strong>Бронирование</strong><br />
                                Выберите стоянку и найдите свободный автомобиль в каталоге
                            </div>
                        </article>
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default MapPage;