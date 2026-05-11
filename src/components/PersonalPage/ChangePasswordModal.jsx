import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';

function ChangePasswordModal({ show, onClose, onSaved }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
        setError('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError('Новый пароль и подтверждение не совпадают');
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.put('/users/me/password', {
                oldPassword,
                newPassword
            });
            setMessage('Пароль успешно изменён!');
            setTimeout(() => {
                if (onSaved) onSaved();
                handleClose();
            }, 1500);
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка смены пароля');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            className="custom-modal"
            aria-labelledby="change-password-modal-title"
        >
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title id="change-password-modal-title" className="custom-modal-title">
                    Смена пароля
                </Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit} aria-label="Форма смены пароля">
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
                    
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="old-password" className="custom-form-label">Текущий пароль</Form.Label>
                        <Form.Control
                            id="old-password"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            className="custom-form-control"
                            aria-required="true"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="new-password" className="custom-form-label">Новый пароль</Form.Label>
                        <Form.Control
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="custom-form-control"
                            aria-required="true"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="confirm-password" className="custom-form-label">Подтвердите новый пароль</Form.Label>
                        <Form.Control
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="custom-form-control"
                            aria-required="true"
                        />
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer className="custom-modal-footer">
                    <Button 
                        onClick={handleClose} 
                        className="custom-btn-outline"
                        aria-label="Отмена смены пароля"
                    >
                        Отмена
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={loading} 
                        className="custom-btn-outline"
                        aria-label={loading ? 'Сохранение нового пароля' : 'Сменить пароль'}
                    >
                        {loading ? 'Сохранение...' : 'Сменить пароль'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ChangePasswordModal;