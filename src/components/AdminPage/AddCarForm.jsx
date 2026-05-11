import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/addForms.css';

function AddCarForm({ spots, onCarAdded }) {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [number, setNumber] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [spotId, setSpotId] = useState('');
    const [spotNumber, setSpotNumber] = useState('');
    const [category, setCategory] = useState('Эконом');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    
    const [enginePower, setEnginePower] = useState('');
    const [transmission, setTransmission] = useState('');
    const [driveUnit, setDriveUnit] = useState('');
    const [seats, setSeats] = useState(5);
    const [doors, setDoors] = useState(4);
    
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const licensePlateRegex = /^[АВЕКМНОРСТУХ][0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/i;

    const validateNumber = (plate) => {
        return licensePlateRegex.test(plate.toUpperCase());
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (!validateNumber(number)) {
            setMessage('Неверный формат госномера. Пример: А123ВС777');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('model', model);
            formData.append('number', number.toUpperCase());
            formData.append('color', color);
            formData.append('price_per_minute', parseInt(price));
            formData.append('current_spot_id', spotId || '');
            formData.append('spot_number', spotNumber || '');
            formData.append('category', category);
            formData.append('engine_power', enginePower || '');
            formData.append('transmission', transmission || '');
            formData.append('drive_unit', driveUnit || '');
            formData.append('seats', seats);
            formData.append('doors', doors);
            if (photo) {
                formData.append('photo', photo);
            }

            await axiosInstance.post('/admin/cars', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setMessage('Машина добавлена!');
            setBrand('');
            setModel('');
            setNumber('');
            setColor('');
            setPrice('');
            setSpotId('');
            setSpotNumber('');
            setCategory('Эконом');
            setEnginePower('');
            setTransmission('');
            setDriveUnit('');
            setSeats(5);
            setDoors(4);
            setPhoto(null);
            setPhotoPreview('');
            
            if (onCarAdded) onCarAdded();
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="custom-addcar-container">
            {message && (
                <Alert 
                    variant={message.includes('Машина добавлена') ? 'success' : 'danger'} 
                    className={message.includes('Машина добавлена') ? 'custom-addcar-alert-success' : 'custom-addcar-alert-danger'}
                    role="alert"
                    aria-live="polite"
                >
                    {message}
                </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="brand" className="custom-addcar-label">Марка</Form.Label>
                            <Form.Control 
                                id="brand"
                                type="text" 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)} 
                                required 
                                className="custom-addcar-input"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="model" className="custom-addcar-label">Модель</Form.Label>
                            <Form.Control 
                                id="model"
                                type="text" 
                                value={model} 
                                onChange={(e) => setModel(e.target.value)} 
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
                            <Form.Label htmlFor="number" className="custom-addcar-label">Госномер</Form.Label>
                            <Form.Control 
                                id="number"
                                type="text" 
                                value={number} 
                                onChange={(e) => setNumber(e.target.value)} 
                                placeholder="А123ВС777"
                                required 
                                className="custom-addcar-input"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="color" className="custom-addcar-label">Цвет</Form.Label>
                            <Form.Control 
                                id="color"
                                type="text" 
                                value={color} 
                                onChange={(e) => setColor(e.target.value)} 
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
                            <Form.Label htmlFor="price" className="custom-addcar-label">Цена за минуту</Form.Label>
                            <Form.Control 
                                id="price"
                                type="number" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                                required 
                                className="custom-addcar-input"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="category" className="custom-addcar-label">Категория</Form.Label>
                            <Form.Select 
                                id="category"
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="custom-addcar-select"
                                aria-label="Выберите категорию автомобиля"
                            >
                                <option value="Эконом">Эконом</option>
                                <option value="Комфорт">Комфорт</option>
                                <option value="Электромобиль">Электромобиль</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="custom-addcar-subtitle">Характеристики</h5>
                <div className="custom-addcar-section">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="enginePower" className="custom-addcar-label">Мощность (л.с.)</Form.Label>
                                <Form.Control 
                                    id="enginePower"
                                    type="number" 
                                    value={enginePower} 
                                    onChange={(e) => setEnginePower(e.target.value)}
                                    className="custom-addcar-input"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="transmission" className="custom-addcar-label">Коробка передач</Form.Label>
                                <Form.Select 
                                    id="transmission"
                                    value={transmission} 
                                    onChange={(e) => setTransmission(e.target.value)}
                                    className="custom-addcar-select"
                                >
                                    <option value="">Выберите</option>
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
                                <Form.Label htmlFor="driveUnit" className="custom-addcar-label">Привод</Form.Label>
                                <Form.Select 
                                    id="driveUnit"
                                    value={driveUnit} 
                                    onChange={(e) => setDriveUnit(e.target.value)}
                                    className="custom-addcar-select"
                                >
                                    <option value="">Выберите</option>
                                    <option value="Передний">Передний</option>
                                    <option value="Задний">Задний</option>
                                    <option value="Полный">Полный</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="seats" className="custom-addcar-label">Кол-во мест</Form.Label>
                                <Form.Control 
                                    id="seats"
                                    type="number" 
                                    value={seats} 
                                    onChange={(e) => setSeats(e.target.value)} 
                                    min="2" max="9"
                                    className="custom-addcar-input"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="doors" className="custom-addcar-label">Кол-во дверей</Form.Label>
                                <Form.Control 
                                    id="doors"
                                    type="number" 
                                    value={doors} 
                                    onChange={(e) => setDoors(e.target.value)} 
                                    min="2" max="5"
                                    className="custom-addcar-input"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spotId" className="custom-addcar-label">Стоянка</Form.Label>
                            <Form.Select 
                                id="spotId"
                                value={spotId} 
                                onChange={(e) => setSpotId(e.target.value)}
                                className="custom-addcar-select"
                            >
                                <option value="">Без стоянки</option>
                                {spots.map(spot => (
                                    <option key={spot.id} value={spot.id}>{spot.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="spotNumber" className="custom-addcar-label">Номер места на стоянке</Form.Label>
                            <Form.Control 
                                id="spotNumber"
                                type="number" 
                                value={spotNumber} 
                                onChange={(e) => setSpotNumber(e.target.value)}
                                className="custom-addcar-input"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="photo" className="custom-addcar-label">Фото машины</Form.Label>
                    <Form.Control 
                        id="photo"
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoChange}
                        className="custom-addcar-input"
                    />
                    {photoPreview && (
                        <div className="custom-addcar-preview">
                            <img src={photoPreview} alt="Предпросмотр фото машины" />
                        </div>
                    )}
                </Form.Group>

                <Button 
                    type="submit" 
                    disabled={loading}
                    className="custom-addcar-btn"
                    aria-label={loading ? 'Добавление машины' : 'Добавить машину'}
                >
                    {loading ? 'Добавление...' : 'Добавить машину'}
                </Button>
            </Form>
        </Container>
    );
}

export default AddCarForm;