import { Link } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import '../../styles/carCard.css';

function CarCard({ car, user, onBook, onCancel }) {
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Эконом': return '';
            case 'Комфорт': return '';
            case 'Электромобиль': return '⚡';
            default: return '';
        }
    };

    const getStatusBadge = () => {
        switch (car.status) {
            case 'free': return <Badge bg="success" className="custom-status-badge">Свободна</Badge>;
            case 'booked': return <Badge bg="warning" text="dark" className="custom-status-badge">Забронирована</Badge>;
            case 'rented': return <Badge bg="danger" className="custom-status-badge">Арендована</Badge>;
            default: return <Badge bg="secondary" className="custom-status-badge">{car.status}</Badge>;
        }
    };

    const photoUrl = car.photo_url ? `http://localhost:8080${car.photo_url}` : null;

    return (
        <Card className="custom-car-card h-100">
            <div className="custom-car-image" style={{ height: '200px', overflow: 'hidden' }}>
                {photoUrl ? (
                    <Card.Img 
                        variant="top" 
                        src={photoUrl} 
                        alt={`${car.brand} ${car.model}`}
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                        <span style={{ fontSize: '3rem' }} aria-hidden="true">Нет фото</span>
                        <span className="visually-hidden">Нет фото</span>
                    </div>
                )}
            </div>
            
            <Card.Body className="d-flex flex-column">
                <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none' }} aria-label={`Подробнее о ${car.brand} ${car.model}`}>
                    <Card.Title className="custom-car-title">{car.brand} {car.model}</Card.Title>
                </Link>
                <Card.Subtitle className="custom-car-category">
                    <span aria-hidden="true">{getCategoryIcon(car.category)}</span>
                    <span>{car.category || 'Эконом'}</span>
                </Card.Subtitle>
                
                <Card.Text className="custom-car-text">
                    <strong>Номер:</strong> {car.number}<br />
                    <strong>Цвет:</strong> {car.color}<br />
                    <strong>Цена:</strong> {car.price_per_minute} ₽/мин<br />
                    <strong>Статус:</strong> {getStatusBadge()}
                </Card.Text>
                
                <div className="mt-auto">
                    {user ? (
                        <>
                            {car.status === 'free' && (
                                <Button 
                                    onClick={() => onBook(car.id, car.current_spot_id)}
                                    className="custom-btn-book w-100"
                                    size="sm"
                                    aria-label={`Забронировать ${car.brand} ${car.model}`}
                                >
                                    Забронировать
                                </Button>
                            )}
                            
                            {car.status === 'booked' && car.booked_by_user && (
                                <Button 
                                    onClick={() => onCancel(car.id)}
                                    className="custom-btn-cancel w-100"
                                    size="sm"
                                    aria-label={`Отменить бронь ${car.brand} ${car.model}`}
                                >
                                    Отменить бронь
                                </Button>
                            )}
                            
                            {(car.status === 'booked' && !car.booked_by_user) || car.status === 'rented' && (
                                <Button disabled className="custom-btn-disabled w-100" size="sm">
                                    {car.status === 'booked' ? 'Забронирована' : 'В аренде'}
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button disabled className="custom-btn-disabled w-100" size="sm">
                            Войдите чтобы арендовать
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default CarCard;