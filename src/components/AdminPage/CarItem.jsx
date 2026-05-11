import { useState } from 'react';
import { ListGroup, Button, Badge, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';

function CarItem({ car, onEdit, onDelete }) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`Удалить машину ${car.brand} ${car.model} (${car.number})?`)) return;
        
        setDeleting(true);
        try {
            await axiosInstance.delete(`/admin/cars/${car.id}`);
            alert('Машина удалена');
            if (onDelete) onDelete();
        } catch (error) {
            alert('Ошибка: ' + (error.response?.data?.message || 'не удалось удалить'));
        } finally {
            setDeleting(false);
        }
    };

    const getStatusText = () => {
        switch (car.status) {
            case 'free': return 'Свободна';
            case 'rented': return 'Арендована';
            case 'booked': return 'Забронирована';
            default: return car.status;
        }
    };

    const getStatusBadge = () => {
        switch (car.status) {
            case 'free': return <Badge bg="success">Свободна</Badge>;
            case 'rented': return <Badge bg="danger">Арендована</Badge>;
            case 'booked': return <Badge bg="warning" text="dark">Забронирована</Badge>;
            default: return <Badge bg="secondary">{car.status}</Badge>;
        }
    };

    return (
        <ListGroup.Item className="py-3" role="listitem">
            <Row className="align-items-center">
                <Col>
                    <div>
                        <strong>{car.brand} {car.model}</strong>
                        <br />
                        <span>
                            Категория: {car.category || 'Эконом'}
                        </span>
                        <br />
                        <small>Номер: {car.number} | Цвет: {car.color}</small>
                        <br />
                        <small>Цена: {car.price_per_minute} ₽/мин | Место №{car.spot_number || '—'}</small>
                        <br />
                        <div className="mt-1">
                            <strong>Статус:</strong> {getStatusBadge()}
                            <span className="visually-hidden">Статус: {getStatusText()}</span>
                        </div>
                    </div>
                </Col>
                <Col xs="auto">
                    <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={onEdit}
                        className="me-2"
                        aria-label={`Редактировать ${car.brand} ${car.model}`}
                    >
                        Редактировать
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={handleDelete} 
                        disabled={deleting}
                        aria-label={`Удалить ${car.brand} ${car.model}`}
                    >
                        {deleting ? 'Удаление...' : 'Удалить'}
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default CarItem;