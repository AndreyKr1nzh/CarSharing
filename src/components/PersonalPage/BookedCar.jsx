import { Card, Button } from 'react-bootstrap';
import '../../styles/bookedCar.css';

function BookedCar({ car, onStart, onCancel }) {
    if (!car) return null;

    return (
        <Card className="custom-booked-card mb-4">
            <Card.Body>
                <Card.Title className="custom-booked-title">Забронированная машина</Card.Title>
                <Card.Text className="custom-booked-text">
                    <strong>{car.brand} {car.model}</strong><br />
                    Номер: {car.number}<br />
                    Цена: {car.price_per_minute} ₽/мин
                </Card.Text>
                <Button 
                    variant="success" 
                    onClick={onStart} 
                    className="custom-booked-btn-start me-2"
                    aria-label={`Начать поездку на ${car.brand} ${car.model}`}
                >
                    Начать поездку
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={onCancel}
                    className="custom-booked-btn-cancel"
                    aria-label={`Отменить бронь ${car.brand} ${car.model}`}
                >
                    Отменить бронь
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BookedCar;