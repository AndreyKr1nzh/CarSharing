import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/loginPage.css';

function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axiosInstance.post('/authorization', { email, password });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            if (onLogin) onLogin(response.data.user);
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка входа');
        }
    };

    return (
        <main className="custom-login-container">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={5}>
                        <section className="custom-login-card" aria-labelledby="login-title">
                            <h1 id="login-title" className="custom-login-title">Вход в систему</h1>
                            
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
                            
                            <Form onSubmit={handleSubmit} aria-label="Форма входа">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="login-email" className="custom-login-label">Email</Form.Label>
                                    <Form.Control
                                        id="login-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="custom-login-input"
                                        aria-required="true"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="login-password" className="custom-login-label">Пароль</Form.Label>
                                    <Form.Control
                                        id="login-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="custom-login-input"
                                        aria-required="true"
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    className="custom-login-btn w-100"
                                    aria-label="Войти в систему"
                                >
                                    Войти
                                </Button>
                            </Form>

                            <div className="text-center">
                                <p className="custom-login-text">
                                    Нет аккаунта? <Link to="/register" className="custom-login-link" aria-label="Перейти к регистрации">Зарегистрируйтесь</Link>
                                </p>
                                <p className="custom-login-text">
                                    <Link to="/forgot-password" className="custom-login-link" aria-label="Восстановить пароль">Забыли пароль?</Link>
                                </p>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default LoginPage;