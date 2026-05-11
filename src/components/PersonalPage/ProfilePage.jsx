import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import UserProfile from './UserProfile';
import DocsStatus from './DocsStatus';
import PendingPayment from './PendingPayment';
import ActiveRental from './ActiveRental';
import BookedCar from './BookedCar';
import RentalHistory from './RentalHistory';
import DocsModal from './DocsModal';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [activeRental, setActiveRental] = useState(null);
    const [bookedCar, setBookedCar] = useState(null);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDocsModal, setShowDocsModal] = useState(false);
    const [isDocsVerified, setIsDocsVerified] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const [profileRes, activeRes, historyRes, bookedRes, pendingRes, docsRes] = await Promise.all([
                axiosInstance.get('/users/me'),
                axiosInstance.get('/users/me/rentals/active'),
                axiosInstance.get('/users/me/rentals/history'),
                axiosInstance.get('/users/me/rentals/booked').catch(() => ({ data: { data: null } })),
                axiosInstance.get('/users/me/rentals/pending').catch(() => ({ data: { data: null } })),
                axiosInstance.get('/users/me/documents').catch(() => ({ data: { data: null } }))
            ]);
            
            setUser(profileRes.data.data);
            setActiveRental(activeRes.data.data);
            setHistory(historyRes.data.data || []);
            setBookedCar(bookedRes.data.data);
            setPendingPayment(pendingRes.data.data);
            setIsDocsVerified(docsRes.data.data?.is_verified || false);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEndRental = async () => {
        if (!window.confirm('Завершить поездку?')) return;
        try {
            const response = await axiosInstance.put(`/rentals/${activeRental.id}/end`);
            alert(response.data.message);
            loadData();
        } catch (error) {
            alert('Ошибка: ' + (error.response?.data?.message || 'не удалось завершить аренду'));
        }
    };

    const handlePayRental = async (rentalId) => {
        if (!window.confirm(`Оплатить ${pendingPayment.total_price} ₽?`)) return;
        try {
            const response = await axiosInstance.post(`/rentals/${rentalId}/pay`);
            alert(response.data.message);
            loadData();
        } catch (error) {
            alert('Ошибка: ' + (error.response?.data?.message || 'не удалось оплатить'));
        }
    };

    const handleStartRental = async () => {
        try {
            await axiosInstance.post(`/rentals/start/${bookedCar.car_id}`);
            alert('Поездка начата!');
            loadData();
        } catch (error) {
            alert('Ошибка: ' + (error.response?.data?.message || 'не удалось начать поездку'));
        }
    };

    const handleCancelBooking = async () => {
        if (!window.confirm('Отменить бронирование?')) return;
        try {
            await axiosInstance.delete(`/cars/${bookedCar.car_id}/book`);
            alert('Бронь отменена');
            loadData();
        } catch (error) {
            alert('Ошибка: ' + (error.response?.data?.message || 'не удалось отменить бронь'));
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) return <div className="text-center mt-5">Загрузка...</div>;
    if (!user) return <div className="text-center mt-5">Ошибка загрузки профиля</div>;

    return (
        <main>
            <Container className="mt-4">
                <h1 className="visually-hidden">Личный кабинет</h1>
                
                <Row className="justify-content-center">
                    <Col lg={8} md={10} sm={12}>
                        <UserProfile 
                            user={user}
                            onEditProfile={() => setShowEditModal(true)}
                            onChangePassword={() => setShowPasswordModal(true)}
                        />
                        
                        <DocsStatus 
                            isVerified={isDocsVerified}
                            onVerify={() => setShowDocsModal(true)}
                        />
                        
                        <PendingPayment 
                            payment={pendingPayment}
                            onPay={handlePayRental}
                        />
                        
                        <ActiveRental 
                            rental={activeRental}
                            onEnd={handleEndRental}
                        />
                        
                        <BookedCar 
                            car={bookedCar}
                            onStart={handleStartRental}
                            onCancel={handleCancelBooking}
                        />
                        
                        <RentalHistory history={history} />
                    </Col>
                </Row>
                
                <EditProfileModal 
                    show={showEditModal}
                    user={user}
                    onClose={() => setShowEditModal(false)}
                    onSaved={loadData}
                />
                
                <DocsModal 
                    show={showDocsModal}
                    onClose={() => setShowDocsModal(false)}
                    onSaved={loadData}
                />
                
                <ChangePasswordModal 
                    show={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    onSaved={loadData}
                />
            </Container>
        </main>
    );
}

export default ProfilePage;