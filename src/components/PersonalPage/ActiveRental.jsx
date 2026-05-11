import { Card, Button } from 'react-bootstrap';
import '../../styles/bookedCar.css';

function ActiveRental({ rental, onEnd }) {
    if (!rental) return null;

    return (
        <Card className="custom-booked-card mb-4">
            <Card.Body>
                <Card.Title className="custom-booked-title">Текущая аренда</Card.Title>
                <Card.Text className="custom-booked-text">
                    <strong>{rental.brand} {rental.model}</strong><br />
                    Начало: {new Date(rental.start_time).toLocaleString()}<br />
                    Цена: {rental.price_per_minute} ₽/мин<br />
                    Длительность: {rental.current_minutes} мин<br />
                    <strong>Текущая стоимость: {rental.current_price} ₽</strong>
                </Card.Text>
                <Button 
                    variant="danger" 
                    onClick={onEnd}
                    className="custom-booked-btn-cancel"
                    aria-label="Завершить поездку"
                >
                    Завершить поездку
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ActiveRental;