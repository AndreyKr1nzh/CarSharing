import { useState } from 'react';
import { Card, Button, ListGroup, Modal, Form, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import CarItem from './CarItem';
import EditCarModal from './EditCarModal';
import '../../styles/spotsList.css';

function SpotsList({ spots, onDataChanged }) {
    const [editingSpot, setEditingSpot] = useState(null);
    const [showSpotModal, setShowSpotModal] = useState(false);
    const [editingCar, setEditingCar] = useState(null);
    const [showCarModal, setShowCarModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditSpot = (spot) => {
        setEditingSpot(spot);
        setShowSpotModal(true);
    };

    const handleUpdateSpot = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const updatedSpot = {
            name: formData.get('name'),
            address: formData.get('address'),
            lat: parseFloat(formData.get('lat')),
            lon: parseFloat(formData.get('lon')),
            total_spots: parseInt(formData.get('total_spots'))
        };

        try {
            await axiosInstance.put(`/admin/spots/${editingSpot.id}`, updatedSpot);
            alert('Стоянка обновлена');
            setShowSpotModal(false);
            setEditingSpot(null);
            onDataChanged();
        } catch (error) {
            alert('Ошибка: ' + (error.response?.data?.message || 'не удалось обновить стоянку'));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSpot = async (spotId, spotName) => {
        if (!window.confirm(`Удалить стоянку "${spotName}"?`)) return;
        
        try {
            await axiosInstance.delete(`/admin/spots/${spotId}`);
            alert('Стоянка удалена');
            onDataChanged();
        } catch (error) {
            alert('Ошибка: ' + (error.response?.data?.message || 'не удалось удалить стоянку'));
        }
    };

    const handleEditCar = (car) => {
        setEditingCar(car);
        setShowCarModal(true);
    };

    return (
        <div>
            {spots.map(spot => (
                <Card key={spot.id} className="custom-spot-card mb-4">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <Card.Title className="custom-spot-title">{spot.name}</Card.Title>
                                <Card.Subtitle className="custom-spot-subtitle mb-2">
                                    {spot.address}
                                </Card.Subtitle>
                                <Card.Text className="custom-spot-text">
                                    Всего мест: {spot.total_spots} | Занято: {spot.occupied_spots || 0}
                                </Card.Text>
                            </div>
                            <div>
                                <Button 
                                    size="sm" 
                                    onClick={() => handleEditSpot(spot)}
                                    className="custom-spot-btn-edit me-2"
                                    aria-label={`Редактировать стоянку ${spot.name}`}
                                >
                                    Редактировать
                                </Button>
                                <Button 
                                    size="sm" 
                                    onClick={() => handleDeleteSpot(spot.id, spot.name)}
                                    className="custom-spot-btn-delete"
                                    aria-label={`Удалить стоянку ${spot.name}`}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </div>
                        
                        <h5 className="custom-spot-cars-title">Машины на стоянке:</h5>
                        {spot.cars && spot.cars.length > 0 ? (
                            <ListGroup variant="flush" className="custom-spot-list">
                                {spot.cars.map(car => (
                                    <CarItem 
                                        key={car.id} 
                                        car={car} 
                                        onEdit={() => handleEditCar(car)}
                                        onDelete={onDataChanged}
                                    />
                                ))}
                            </ListGroup>
                        ) : (
                            <p className="custom-spot-empty">Нет машин на этой стоянке</p>
                        )}
                    </Card.Body>
                </Card>
            ))}

            <Modal 
                show={showSpotModal} 
                onHide={() => setShowSpotModal(false)} 
                centered 
                className="custom-modal"
                aria-labelledby="edit-spot-modal-title"
            >
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title id="edit-spot-modal-title" className="custom-modal-title">
                        Редактировать стоянку
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateSpot} aria-label="Форма редактирования стоянки">
                    <Modal.Body className="custom-modal-body">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spot-name" className="custom-form-label">Название</Form.Label>
                            <Form.Control 
                                id="spot-name"
                                name="name" 
                                defaultValue={editingSpot?.name} 
                                required 
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spot-address" className="custom-form-label">Адрес</Form.Label>
                            <Form.Control 
                                id="spot-address"
                                name="address" 
                                defaultValue={editingSpot?.address} 
                                required 
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="spot-lat" className="custom-form-label">Широта</Form.Label>
                                    <Form.Control 
                                        id="spot-lat"
                                        name="lat" 
                                        type="number" 
                                        step="any" 
                                        defaultValue={editingSpot?.lat} 
                                        required 
                                        className="custom-form-control"
                                        aria-required="true"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="spot-lon" className="custom-form-label">Долгота</Form.Label>
                                    <Form.Control 
                                        id="spot-lon"
                                        name="lon" 
                                        type="number" 
                                        step="any" 
                                        defaultValue={editingSpot?.lon} 
                                        required 
                                        className="custom-form-control"
                                        aria-required="true"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spot-total-spots" className="custom-form-label">Количество мест</Form.Label>
                            <Form.Control 
                                id="spot-total-spots"
                                name="total_spots" 
                                type="number" 
                                defaultValue={editingSpot?.total_spots} 
                                required 
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="custom-modal-footer">
                        <Button 
                            onClick={() => setShowSpotModal(false)} 
                            className="custom-btn-outline"
                            aria-label="Отмена редактирования стоянки"
                        >
                            Отмена
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading} 
                            className="custom-btn-outline"
                            aria-label={loading ? 'Сохранение стоянки' : 'Сохранить изменения стоянки'}
                        >
                            {loading ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {showCarModal && editingCar && (
                <EditCarModal 
                    show={showCarModal}
                    car={editingCar}
                    spots={spots}
                    onClose={() => setShowCarModal(false)}
                    onSaved={onDataChanged}
                />
            )}
        </div>
    );
}

export default SpotsList;