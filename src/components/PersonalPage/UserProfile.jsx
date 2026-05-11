import { Card, Button, Row, Col } from 'react-bootstrap';
import '../../styles/userProfile.css';

function UserProfile({ user, onEditProfile, onChangePassword }) {
    return (
        <Card className="custom-profile-card mb-4">
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs="auto">
                        {user.avatar_url ? (
                            <img 
                                src={`http://localhost:8080${user.avatar_url}`} 
                                alt="Аватар пользователя"
                                className="custom-profile-avatar rounded-circle"
                            />
                        ) : (
                            <div className="custom-profile-avatar-placeholder rounded-circle" aria-hidden="true">
                                <span>👤</span>
                            </div>
                        )}
                    </Col>
                    <Col>
                        <div className="custom-profile-info">
                            <p><strong>Имя:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    </Col>
                </Row>
                
                <div className="mt-3">
                    <Button 
                        size="sm" 
                        onClick={onEditProfile}
                        className="custom-profile-btn-edit me-2"
                        aria-label="Редактировать профиль"
                    >
                        Редактировать профиль
                    </Button>
                    <Button 
                        size="sm" 
                        onClick={onChangePassword}
                        className="custom-profile-btn-password"
                        aria-label="Сменить пароль"
                    >
                        Сменить пароль
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default UserProfile;