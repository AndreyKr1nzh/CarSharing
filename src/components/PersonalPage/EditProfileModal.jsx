import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';

function EditProfileModal({ show, user, onClose, onSaved }) {
    const [username, setUsername] = useState(user.username);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user.avatar_url ? `http://localhost:8080${user.avatar_url}` : '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleClose = () => {
        setUsername(user.username);
        setAvatarFile(null);
        setAvatarPreview(user.avatar_url ? `http://localhost:8080${user.avatar_url}` : '');
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
            if (username !== user.username) {
                await axiosInstance.put('/users/me', { username });
            }
            
            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                
                await axiosInstance.post('/users/me/avatar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            
            setMessage('Профиль обновлён!');
            setTimeout(() => {
                onSaved();
                handleClose();
            }, 1000);
        } catch (error) {
            setError(error.response?.data?.message || 'Не удалось обновить профиль');
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
            aria-labelledby="edit-profile-modal-title"
        >
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title id="edit-profile-modal-title" className="custom-modal-title">
                    Редактировать профиль
                </Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit} aria-label="Форма редактирования профиля">
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
                        <Form.Label htmlFor="edit-username" className="custom-form-label">Имя</Form.Label>
                        <Form.Control
                            id="edit-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="custom-form-control"
                            aria-required="true"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="edit-avatar" className="custom-form-label">Аватар</Form.Label>
                        <Form.Control
                            id="edit-avatar"
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleAvatarChange}
                            className="custom-form-control"
                        />
                        {avatarPreview && (
                            <div className="mt-2">
                                <img 
                                    src={avatarPreview} 
                                    alt="Предпросмотр аватара"
                                    className="custom-avatar-preview"
                                />
                            </div>
                        )}
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer className="custom-modal-footer">
                    <Button 
                        onClick={handleClose} 
                        className="custom-btn-outline"
                        aria-label="Отмена редактирования профиля"
                    >
                        Отмена
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={loading} 
                        className="custom-btn-outline"
                        aria-label={loading ? 'Сохранение изменений профиля' : 'Сохранить изменения профиля'}
                    >
                        {loading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditProfileModal;