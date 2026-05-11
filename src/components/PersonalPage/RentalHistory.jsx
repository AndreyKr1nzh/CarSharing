import { Card, Table, Badge } from 'react-bootstrap';
import '../../styles/rentalHistory.css';

function RentalHistory({ history }) {
    if (history.length === 0) {
        return (
            <Card className="custom-history-card">
                <Card.Body>
                    <Card.Text className="custom-history-empty">Нет истории аренд</Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="custom-history-card">
            <Card.Body>
                <Card.Title className="custom-history-title">История поездок</Card.Title>
                
                <div className="custom-history-table-wrapper">
                    <Table responsive className="custom-history-table">
                        <thead>
                            <tr>
                                <th>Машина</th>
                                <th>Номер</th>
                                <th>Дата</th>
                                <th>Длительность</th>
                                <th>Стоимость</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(rental => (
                                <tr key={rental.id}>
                                    <td>{rental.brand} {rental.model}</td>
                                    <td>{rental.number}</td>
                                    <td>{new Date(rental.start_time).toLocaleDateString()}</td>
                                    <td>{Math.ceil((new Date(rental.end_time) - new Date(rental.start_time)) / 60000)} мин</td>
                                    <td>{rental.total_price} ₽</td>
                                    <td>
                                        <Badge 
                                            className={rental.is_paid ? 'custom-history-badge-paid' : 'custom-history-badge-pending'}
                                        >
                                            {rental.is_paid ? 'Оплачено' : 'Ожидает оплаты'}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RentalHistory;