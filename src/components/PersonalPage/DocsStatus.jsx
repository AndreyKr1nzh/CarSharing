import { Card, Button } from 'react-bootstrap';

function DocsStatus({ isVerified, onVerify }) {
    if (isVerified) return null;

    return (
        <Card className="mb-4 border-warning bg-warning bg-opacity-10">
            <Card.Body>
                <Card.Title className="text-warning">Верификация документов</Card.Title>
                <Card.Text>
                    Для аренды автомобиля необходимо подтвердить личные данные.
                </Card.Text>
                <Button 
                    variant="warning" 
                    onClick={onVerify}
                    aria-label="Заполнить документы для верификации"
                >
                    Заполнить документы
                </Button>
            </Card.Body>
        </Card>
    );
}

export default DocsStatus;