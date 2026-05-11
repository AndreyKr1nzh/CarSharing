import { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Spinner } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import AddCarForm from './AddCarForm';
import AddSpotForm from './AddSpotForm';
import SpotsList from './SpotsList';
import UsersList from './UsersList';
import '../../styles/adminPanel.css';

function AdminPanel() {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('spots');

    const loadData = async () => {
        try {
            const response = await axiosInstance.get('/admin/spots');
            setSpots(response.data.data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <section className="text-center mt-5">
                <Spinner animation="border" variant="primary" className="custom-admin-spinner" />
                <p className="custom-admin-spinner-text mt-2">Загрузка админ-панели...</p>
            </section>
        );
    }

    return (
        <main>
            <Container className="mt-4">
                <section className="custom-admin-container">
                    <h1 className="visually-hidden">Админ-панель</h1>
                    
                    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Nav variant="tabs" className="custom-admin-nav" role="tablist" aria-label="Разделы админ-панели">
                            <Nav.Item role="presentation">
                                <Nav.Link 
                                    eventKey="spots" 
                                    role="tab"
                                    aria-selected={activeTab === 'spots'}
                                    aria-current={activeTab === 'spots' ? 'page' : undefined}
                                >
                                    Стоянки
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link 
                                    eventKey="cars" 
                                    role="tab"
                                    aria-selected={activeTab === 'cars'}
                                    aria-current={activeTab === 'cars' ? 'page' : undefined}
                                >
                                    Машины
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link 
                                    eventKey="users" 
                                    role="tab"
                                    aria-selected={activeTab === 'users'}
                                    aria-current={activeTab === 'users' ? 'page' : undefined}
                                >
                                    Пользователи
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        
                        <Tab.Content>
                            <Tab.Pane eventKey="spots" className="custom-admin-pane" role="tabpanel" aria-labelledby="spots-tab">
                                <section>
                                    <AddSpotForm onSpotAdded={loadData} />
                                    <hr className="custom-admin-divider" />
                                    <SpotsList spots={spots} onDataChanged={loadData} />
                                </section>
                            </Tab.Pane>
                            
                            <Tab.Pane eventKey="cars" className="custom-admin-pane" role="tabpanel" aria-labelledby="cars-tab">
                                <section>
                                    <AddCarForm spots={spots} onCarAdded={loadData} />
                                    <hr className="custom-admin-divider" />
                                </section>
                            </Tab.Pane>
                            
                            <Tab.Pane eventKey="users" className="custom-admin-pane" role="tabpanel" aria-labelledby="users-tab">
                                <section>
                                    <UsersList />
                                </section>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </section>
            </Container>
        </main>
    );
}

export default AdminPanel;