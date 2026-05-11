import { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/addForms.css';

function AddSpotForm({ onSpotAdded }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [totalSpots, setTotalSpots] = useState(10);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await axiosInstance.post('/admin/spots', {
                name,
                address,
                lat: parseFloat(lat),
                lon: parseFloat(lon),
                total_spots: totalSpots
            });
            
            setMessage('Стоянка добавлена!');
            setName('');
            setAddress('');
            setLat('');
            setLon('');
            setTotalSpots(10);
            
            if (onSpotAdded) onSpotAdded();
            
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка добавления стоянки');
        }
    };

    return (
        <div className="custom-addcar-container mb-4">
            {message && (
                <Alert 
                    variant="success" 
                    className="custom-addcar-alert-success"
                    role="alert"
                    aria-live="polite"
                >
                    {message}
                </Alert>
            )}
            {error && (
                <Alert 
                    variant="danger" 
                    className="custom-addcar-alert-danger"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spotName" className="custom-addcar-label">Название</Form.Label>
                            <Form.Control
                                id="spotName"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="custom-addcar-input"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spotAddress" className="custom-addcar-label">Адрес</Form.Label>
                            <Form.Control
                                id="spotAddress"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="custom-addcar-input"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spotLat" className="custom-addcar-label">Широта (lat)</Form.Label>
                            <Form.Control
                                id="spotLat"
                                type="number"
                                step="any"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                required
                                className="custom-addcar-input"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spotLon" className="custom-addcar-label">Долгота (lon)</Form.Label>
                            <Form.Control
                                id="spotLon"
                                type="number"
                                step="any"
                                value={lon}
                                onChange={(e) => setLon(e.target.value)}
                                required
                                className="custom-addcar-input"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalSpots" className="custom-addcar-label">Количество мест</Form.Label>
                    <Form.Control
                        id="totalSpots"
                        type="number"
                        value={totalSpots}
                        onChange={(e) => setTotalSpots(parseInt(e.target.value))}
                        min="1"
                        className="custom-addcar-input"
                    />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit" 
                    className="custom-addcar-btn"
                    aria-label="Добавить новую стоянку"
                >
                    Добавить стоянку
                </Button>
            </Form>
        </div>
    );
}

export default AddSpotForm;