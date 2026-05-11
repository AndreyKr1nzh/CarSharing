import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/loginPage.css';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            await axiosInstance.post('/register', { name, email, password });
            
            setSuccess('Регистрация успешна! На вашу почту отправлена ссылка для подтверждения.');
            
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <main className="custom-login-container">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={5}>
                        <section className="custom-login-card" aria-labelledby="register-title">
                            <h1 id="register-title" className="custom-login-title">Регистрация</h1>
                            
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
                            {success && (
                                <Alert 
                                    variant="success" 
                                    className="custom-login-alert"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {success}
                                </Alert>
                            )}
                            
                            <Form onSubmit={handleSubmit} aria-label="Форма регистрации">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="register-name" className="custom-login-label">Имя</Form.Label>
                                    <Form.Control
                                        id="register-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="custom-login-input"
                                        aria-required="true"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="register-email" className="custom-login-label">Email</Form.Label>
                                    <Form.Control
                                        id="register-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="custom-login-input"
                                        aria-required="true"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="register-password" className="custom-login-label">Пароль</Form.Label>
                                    <Form.Control
                                        id="register-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="custom-login-input"
                                        aria-required="true"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="register-confirm-password" className="custom-login-label">Подтвердите пароль</Form.Label>
                                    <Form.Control
                                        id="register-confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="custom-login-input"
                                        aria-required="true"
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    className="custom-login-btn w-100"
                                    aria-label="Зарегистрироваться в сервисе"
                                >
                                    Зарегистрироваться
                                </Button>
                            </Form>

                            <div className="text-center">
                                <p className="custom-login-text">
                                    Уже есть аккаунт? <Link to="/login" className="custom-login-link" aria-label="Перейти ко входу">Войдите</Link>
                                </p>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default RegisterPage;