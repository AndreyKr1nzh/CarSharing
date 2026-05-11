import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/carPage.css';

function CarPage({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDocsVerified, setIsDocsVerified] = useState(false);

    useEffect(() => {
        const loadCar = async () => {
            try {
                const response = await axiosInstance.get(`/cars/${id}`);
                setCar(response.data.data);
                document.title = `${response.data.data.brand} ${response.data.data.model} | CarSharing`;
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                alert('Машина не найдена');
                document.title = 'Машина не найдена | CarSharing';
            } finally {
                setLoading(false);
            }
        };
        loadCar();
    }, [id]);

    useEffect(() => {
        const loadDocsStatus = async () => {
            if (user) {
                try {
                    const response = await axiosInstance.get('/users/me/documents');
                    setIsDocsVerified(response.data.data?.is_verified || false);
                } catch (error) {
                    console.error('Ошибка загрузки статуса документов:', error);
                }
            }
        };
        loadDocsStatus();
    }, [user]);

    const getStatusText = () => {
        switch (car?.status) {
            case 'free': return 'Свободна';
            case 'booked': return 'Забронирована';
            case 'rented': return 'Арендована';
            default: return car?.status;
        }
    };

    const getStatusBadge = () => {
        switch (car?.status) {
            case 'free': return <Badge bg="success">Свободна</Badge>;
            case 'booked': return <Badge bg="warning" text="dark">Забронирована</Badge>;
            case 'rented': return <Badge bg="danger">Арендована</Badge>;
            default: return <Badge bg="secondary">{car?.status}</Badge>;
        }
    };

    const handleBook = async () => {
        if (!isDocsVerified) {
            alert('Для аренды автомобиля необходимо подтвердить документы в личном кабинете');
            return;
        }

        try {
            const response = await axiosInstance.post(`/cars/${car.id}/book`, {
                spot_id: car.current_spot_id
            });
            alert(response.data.message);
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Ошибка бронирования';
            alert(errorMsg);
        }
    };

    const photoUrl = car?.photo_url ? `http://localhost:8080${car.photo_url}` : null;

    if (loading) return <div className="text-center mt-5">Загрузка...</div>;
    if (!car) return <div className="text-center mt-5">Машина не найдена</div>;

    return (
        <div className="custom-carpage-container">
            <Container>
                <Button 
                    variant="link" 
                    onClick={() => navigate(-1)} 
                    className="custom-carpage-back"
                    aria-label="Вернуться к каталогу"
                >
                    ← Назад к каталогу
                </Button>
                
                <h1 className="custom-carpage-title">{car.brand} {car.model}</h1>
                
                <Row>
                    <Col md={6} className="mb-4">
                        <div className="custom-carpage-image">
                            {photoUrl ? (
                                <img 
                                    src={photoUrl} 
                                    alt={`${car.brand} ${car.model}`}
                                    className="img-fluid rounded"
                                />
                            ) : (
                                <div className="custom-carpage-image-placeholder">
                                    <span style={{ fontSize: '4rem' }}>🚗</span>
                                </div>
                            )}
                        </div>
                    </Col>
                    
                    <Col md={6}>
                        <Card className="custom-carpage-info-card">
                            <Card.Body>
                                <Card.Title>Информация об автомобиле</Card.Title>
                                <Card.Text className="custom-carpage-info-text">
                                    <strong>Категория:</strong> {car.category || 'Эконом'}<br />
                                    <strong>Госномер:</strong> {car.number}<br />
                                    <strong>Цена за минуту:</strong> {car.price_per_minute} ₽<br />
                                    <strong>Статус:</strong> {getStatusBadge()}
                                    <span className="visually-hidden">Статус: {getStatusText()}</span><br />
                                    <strong>Стоянка:</strong> {car.spot_name || 'Не указана'}<br />
                                    {car.spot_number && <><strong>Место на стоянке:</strong> {car.spot_number}</>}
                                </Card.Text>
                                
                                {user ? (
                                    car.status === 'free' && (
                                        <Button 
                                            onClick={handleBook}
                                            className="custom-btn-outline w-100"
                                            aria-label={`Забронировать ${car.brand} ${car.model}`}
                                        >
                                            Забронировать
                                        </Button>
                                    )
                                ) : (
                                    <Button disabled className="custom-btn-outline w-100">
                                        Войдите чтобы арендовать
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
                <Row className="mt-4">
                    <Col>
                        <Card className="custom-carpage-specs-card">
                            <Card.Body>
                                <Card.Title>Характеристики</Card.Title>
                                <div className="custom-carpage-specs-list">
                                    <div className="spec-item">
                                        <span className="spec-label">Цвет:</span>
                                        <span className="spec-value">{car.color || '—'}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Мощность:</span>
                                        <span className="spec-value">{car.engine_power ? `${car.engine_power} л.с.` : '—'}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Коробка передач:</span>
                                        <span className="spec-value">{car.transmission || '—'}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Привод:</span>
                                        <span className="spec-value">{car.drive_unit || '—'}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Количество мест:</span>
                                        <span className="spec-value">{car.seats || '5'}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Количество дверей:</span>
                                        <span className="spec-value">{car.doors || '4'}</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CarPage;