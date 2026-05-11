import { Card, Button } from 'react-bootstrap';
import '../../styles/bookedCar.css';

function PendingPayment({ payment, onPay }) {
    if (!payment) return null;

    return (
        <Card className="custom-booked-card mb-4">
            <Card.Body>
                <Card.Title className="custom-booked-title">Ожидает оплаты</Card.Title>
                <Card.Text className="custom-booked-text">
                    <strong>{payment.brand} {payment.model}</strong><br />
                    Номер: {payment.number}<br />
                    Сумма к оплате: <strong>{payment.total_price} ₽</strong>
                </Card.Text>
                <Button 
                    variant="success" 
                    onClick={() => onPay(payment.id)}
                    className="custom-booked-btn-start"
                    aria-label={`Оплатить ${payment.total_price} рублей`}
                >
                    Оплатить
                </Button>
            </Card.Body>
        </Card>
    );
}

export default PendingPayment;