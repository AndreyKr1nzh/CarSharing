import { useState } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';

function EditCarModal({ show, car, spots, onClose, onSaved }) {
    const [brand, setBrand] = useState(car.brand);
    const [model, setModel] = useState(car.model);
    const [number, setNumber] = useState(car.number);
    const [color, setColor] = useState(car.color);
    const [price, setPrice] = useState(car.price_per_minute);
    const [spotId, setSpotId] = useState(car.current_spot_id || '');
    const [spotNumber, setSpotNumber] = useState(car.spot_number || '');
    const [status, setStatus] = useState(car.status);
    const [category, setCategory] = useState(car.category || 'Эконом');
    
    const [enginePower, setEnginePower] = useState(car.engine_power || '');
    const [transmission, setTransmission] = useState(car.transmission || '');
    const [driveUnit, setDriveUnit] = useState(car.drive_unit || '');
    const [seats, setSeats] = useState(car.seats || 5);
    const [doors, setDoors] = useState(car.doors || 4);
    
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(car.photo_url ? `http://localhost:8080${car.photo_url}` : '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleClose = () => {
        setMessage('');
        setError('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('model', model);
            formData.append('number', number);
            formData.append('color', color);
            formData.append('price_per_minute', parseInt(price));
            formData.append('current_spot_id', spotId || '');
            formData.append('spot_number', spotNumber || '');
            formData.append('status', status);
            formData.append('category', category);
            formData.append('engine_power', enginePower || '');
            formData.append('transmission', transmission || '');
            formData.append('drive_unit', driveUnit || '');
            formData.append('seats', seats);
            formData.append('doors', doors);
            if (photo) {
                formData.append('photo', photo);
            }

            await axiosInstance.put(`/admin/cars/${car.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setMessage('Машина обновлена!');
            setTimeout(() => {
                if (onSaved) onSaved();
                handleClose();
            }, 1000);
            
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка обновления машины');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            size="lg" 
            centered 
            className="custom-modal"
            aria-labelledby="edit-car-modal-title"
        >
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title id="edit-car-modal-title" className="custom-modal-title">
                    Редактировать машину
                </Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="custom-modal-body">
                    {message && (
                        <Alert 
                            variant="success" 
                            className="custom-alert-success"
                            role="alert"
                            aria-live="polite"
                        >
                            {message}
                        </Alert>
                    )}
                    {error && (
                        <Alert 
                            variant="danger" 
                            className="custom-alert-danger"
                            role="alert"
                            aria-live="polite"
                        >
                            {error}
                        </Alert>
                    )}
                    
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-brand" className="custom-form-label">Марка</Form.Label>
                                <Form.Control
                                    id="edit-brand"
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
                                    className="custom-form-control"
                                    aria-required="true"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-model" className="custom-form-label">Модель</Form.Label>
                                <Form.Control
                                    id="edit-model"
                                    type="text"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    required
                                    className="custom-form-control"
                                    aria-required="true"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-number" className="custom-form-label">Госномер</Form.Label>
                                <Form.Control
                                    id="edit-number"
                                    type="text"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                    className="custom-form-control"
                                    aria-required="true"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-color" className="custom-form-label">Цвет</Form.Label>
                                <Form.Control
                                    id="edit-color"
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    required
                                    className="custom-form-control"
                                    aria-required="true"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-price" className="custom-form-label">Цена за минуту</Form.Label>
                                <Form.Control
                                    id="edit-price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    className="custom-form-control"
                                    aria-required="true"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-category" className="custom-form-label">Категория</Form.Label>
                                <Form.Select 
                                    id="edit-category"
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="custom-form-select"
                                >
                                    <option value="Эконом">Эконом</option>
                                    <option value="Комфорт">Комфорт</option>
                                    <option value="Электромобиль">Электромобиль</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <h5 className="custom-section-title">Характеристики</h5>
                    
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-engine-power" className="custom-form-label">Мощность (л.с.)</Form.Label>
                                <Form.Control
                                    id="edit-engine-power"
                                    type="number"
                                    value={enginePower}
                                    onChange={(e) => setEnginePower(e.target.value)}
                                    placeholder="150"
                                    className="custom-form-control"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-transmission" className="custom-form-label">Коробка передач</Form.Label>
                                <Form.Select 
                                    id="edit-transmission"
                                    value={transmission} 
                                    onChange={(e) => setTransmission(e.target.value)}
                                    className="custom-form-select"
                                >
                                    <option value="">— Выберите —</option>
                                    <option value="Механика">Механика</option>
                                    <option value="Автомат">Автомат</option>
                                    <option value="Робот">Робот</option>
                                    <option value="Вариатор">Вариатор</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-drive-unit" className="custom-form-label">Привод</Form.Label>
                                <Form.Select 
                                    id="edit-drive-unit"
                                    value={driveUnit} 
                                    onChange={(e) => setDriveUnit(e.target.value)}
                                    className="custom-form-select"
                                >
                                    <option value="">— Выберите —</option>
                                    <option value="Передний">Передний</option>
                                    <option value="Задний">Задний</option>
                                    <option value="Полный">Полный</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-seats" className="custom-form-label">Кол-во мест</Form.Label>
                                <Form.Control
                                    id="edit-seats"
                                    type="number"
                                    value={seats}
                                    onChange={(e) => setSeats(e.target.value)}
                                    min="2"
                                    max="9"
                                    className="custom-form-control"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-doors" className="custom-form-label">Кол-во дверей</Form.Label>
                                <Form.Control
                                    id="edit-doors"
                                    type="number"
                                    value={doors}
                                    onChange={(e) => setDoors(e.target.value)}
                                    min="2"
                                    max="5"
                                    className="custom-form-control"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-spot-id" className="custom-form-label">Стоянка</Form.Label>
                                <Form.Select 
                                    id="edit-spot-id"
                                    value={spotId} 
                                    onChange={(e) => setSpotId(e.target.value)}
                                    className="custom-form-select"
                                >
                                    <option value="">— Без стоянки —</option>
                                    {spots.map(spot => (
                                        <option key={spot.id} value={spot.id}>{spot.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="edit-spot-number" className="custom-form-label">Номер места</Form.Label>
                                <Form.Control
                                    id="edit-spot-number"
                                    type="number"
                                    value={spotNumber}
                                    onChange={(e) => setSpotNumber(e.target.value)}
                                    className="custom-form-control"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="edit-status" className="custom-form-label">Статус</Form.Label>
                        <Form.Select 
                            id="edit-status"
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                            className="custom-form-select"
                        >
                            <option value="free">Свободна</option>
                            <option value="booked">Забронирована</option>
                            <option value="rented">Арендована</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="edit-photo" className="custom-form-label">Фото машины</Form.Label>
                        <Form.Control
                            id="edit-photo"
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handlePhotoChange}
                            className="custom-form-control"
                        />
                        {photoPreview && (
                            <div className="mt-2">
                                <img 
                                    src={photoPreview} 
                                    alt="Предпросмотр фото машины"
                                    className="custom-avatar-preview"
                                />
                            </div>
                        )}
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer className="custom-modal-footer">
                    <Button 
                        variant="secondary" 
                        onClick={handleClose} 
                        className="custom-btn-outline"
                        aria-label="Отмена редактирования"
                    >
                        Отмена
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={loading} 
                        className="custom-btn-outline"
                        aria-label={loading ? 'Сохранение изменений' : 'Сохранить изменения'}
                    >
                        {loading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditCarModal;