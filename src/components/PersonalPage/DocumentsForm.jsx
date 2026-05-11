import { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/modal.css';

function DocumentsForm({ onSaved, onClose }) {
    const [documents, setDocuments] = useState({
        passport_series: '',
        passport_number: '',
        passport_issued_by: '',
        passport_issue_date: '',
        license_series: '',
        license_number: '',
        license_categories: '',
        license_issue_date: '',
        license_expiry_date: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const response = await axiosInstance.get('/users/me/documents');
                if (response.data.data) {
                    setDocuments(response.data.data);
                }
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            }
        };
        loadDocuments();
    }, []);

    const handleChange = (e) => {
        setDocuments({
            ...documents,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setSuccess(false);

        try {
            await axiosInstance.post('/users/me/documents', documents);
            setSuccess(true);
            setMessage('Документы успешно подтверждены! Теперь вам доступна аренда автомобилей.');
            
            setTimeout(() => {
                if (onSaved) onSaved();
                if (onClose) onClose();
            }, 2000);
        } catch (error) {
            setMessage('Ошибка: ' + (error.response?.data?.message || 'не удалось сохранить'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section aria-label="Форма верификации документов">
            <h2 className="custom-modal-title mb-4" style={{ fontSize: '1.2rem' }}>Паспортные данные</h2>
            
            <Form onSubmit={handleSubmit} aria-label="Форма заполнения документов">
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="passport_series" className="custom-form-label">Серия паспорта</Form.Label>
                            <Form.Control
                                id="passport_series"
                                type="text"
                                name="passport_series"
                                value={documents.passport_series}
                                onChange={handleChange}
                                placeholder="1234"
                                required
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="passport_number" className="custom-form-label">Номер паспорта</Form.Label>
                            <Form.Control
                                id="passport_number"
                                type="text"
                                name="passport_number"
                                value={documents.passport_number}
                                onChange={handleChange}
                                placeholder="567890"
                                required
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="passport_issued_by" className="custom-form-label">Кем выдан</Form.Label>
                    <Form.Control
                        id="passport_issued_by"
                        type="text"
                        name="passport_issued_by"
                        value={documents.passport_issued_by}
                        onChange={handleChange}
                        required
                        className="custom-form-control"
                        aria-required="true"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="passport_issue_date" className="custom-form-label">Дата выдачи</Form.Label>
                    <Form.Control
                        id="passport_issue_date"
                        type="date"
                        name="passport_issue_date"
                        value={documents.passport_issue_date}
                        onChange={handleChange}
                        required
                        className="custom-form-control"
                        aria-required="true"
                    />
                </Form.Group>

                <h2 className="custom-modal-title mb-4 mt-4" style={{ fontSize: '1.2rem' }}>Водительское удостоверение</h2>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="license_series" className="custom-form-label">Серия ВУ</Form.Label>
                            <Form.Control
                                id="license_series"
                                type="text"
                                name="license_series"
                                value={documents.license_series}
                                onChange={handleChange}
                                placeholder="1234"
                                required
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="license_number" className="custom-form-label">Номер ВУ</Form.Label>
                            <Form.Control
                                id="license_number"
                                type="text"
                                name="license_number"
                                value={documents.license_number}
                                onChange={handleChange}
                                placeholder="567890"
                                required
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="license_categories" className="custom-form-label">Категории</Form.Label>
                    <Form.Control
                        id="license_categories"
                        type="text"
                        name="license_categories"
                        value={documents.license_categories}
                        onChange={handleChange}
                        placeholder="A, B, C, BE"
                        required
                        className="custom-form-control"
                        aria-required="true"
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="license_issue_date" className="custom-form-label">Дата выдачи</Form.Label>
                            <Form.Control
                                id="license_issue_date"
                                type="date"
                                name="license_issue_date"
                                value={documents.license_issue_date}
                                onChange={handleChange}
                                required
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="license_expiry_date" className="custom-form-label">Дата окончания</Form.Label>
                            <Form.Control
                                id="license_expiry_date"
                                type="date"
                                name="license_expiry_date"
                                value={documents.license_expiry_date}
                                onChange={handleChange}
                                required
                                className="custom-form-control"
                                aria-required="true"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {message && (
                    <Alert 
                        variant={success ? 'success' : 'danger'} 
                        className="mt-3"
                        role="alert"
                        aria-live="polite"
                    >
                        {message}
                    </Alert>
                )}

                <div className="mt-4 d-flex gap-2">
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="custom-btn-outline"
                        aria-label={loading ? 'Сохранение документов' : 'Сохранить документы'}
                    >
                        {loading ? 'Сохранение...' : 'Сохранить документы'}
                    </Button>
                    <Button 
                        type="button" 
                        onClick={onClose}
                        variant="secondary"
                        className="custom-btn-outline"
                        aria-label="Отмена заполнения документов"
                    >
                        Отмена
                    </Button>
                </div>
            </Form>
        </section>
    );
}

export default DocumentsForm;