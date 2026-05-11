import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/loginPage.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axiosInstance.post('/forgot-password', { email });
            setMessage(response.data.message);
            setEmail('');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка');
        }
    };

    return (
        <main className="custom-login-container">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={5}>
                        <section className="custom-login-card" aria-labelledby="forgot-password-title">
                            <h1 id="forgot-password-title" className="custom-login-title">Восстановление пароля</h1>
                            
                            <p className="custom-login-text text-center mb-4">
                                Введите email, указанный при регистрации.<br />
                                Мы отправим ссылку для сброса пароля.
                            </p>
                            
                            {message && (
                                <Alert 
                                    variant="success" 
                                    className="custom-login-alert"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {message}
                                </Alert>
                            )}
                            {error && (
                                <Alert 
                                    variant="danger" 
                                    className="custom-login-alert"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {error}
                                </Alert>
                            )}
                            
                            <Form onSubmit={handleSubmit} aria-label="Форма восстановления пароля">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="reset-email" className="custom-login-label">Email</Form.Label>
                                    <Form.Control
                                        id="reset-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="custom-login-input"
                                        aria-required="true"
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    className="custom-login-btn w-100"
                                    aria-label="Отправить ссылку для восстановления пароля"
                                >
                                    Отправить ссылку
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <Link to="/login" className="custom-login-link" aria-label="Вернуться ко входу в систему">
                                    ← Вернуться ко входу
                                </Link>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default ForgotPasswordPage;