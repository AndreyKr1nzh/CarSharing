import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import CarCard from './CarCard';
import Pagination from './Pagination';
import CatalogFilters from './CatalogFilters';
import '../../styles/catalogPage.css';

function CatalogPage({ user }) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDocsVerified, setIsDocsVerified] = useState(false);
    const [spots, setSpots] = useState([]);
    
    const [tempCategory, setTempCategory] = useState('');
    const [tempPriceMin, setTempPriceMin] = useState('');
    const [tempPriceMax, setTempPriceMax] = useState('');
    const [tempSpotId, setTempSpotId] = useState('');
    
    const [activeCategory, setActiveCategory] = useState('');
    const [activePriceMin, setActivePriceMin] = useState('');
    const [activePriceMax, setActivePriceMax] = useState('');
    const [activeSpotId, setActiveSpotId] = useState('');
    
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 8,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
    });

    useEffect(() => {
        const loadSpots = async () => {
            try {
                const response = await axiosInstance.get('/parking/public');
                setSpots(response.data.data || []);
            } catch (error) {
                console.error('Ошибка загрузки стоянок:', error);
            }
        };
        loadSpots();
    }, []);

    const loadCars = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', 8);
            if (activeCategory) params.append('category', activeCategory);
            if (activePriceMin) params.append('minPrice', activePriceMin);
            if (activePriceMax) params.append('maxPrice', activePriceMax);
            if (activeSpotId) params.append('spotId', activeSpotId);
            
            const response = await axiosInstance.get(`/cars?${params.toString()}`);
            setCars(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setLoading(false);
        }
    }, [activeCategory, activePriceMin, activePriceMax, activeSpotId]);

    useEffect(() => {
        const loadDocsStatus = async () => {
            if (user) {
                try {
                    const response = await axiosInstance.get('/users/me/documents');
                    setIsDocsVerified(response.data.data?.is_verified || false);
                } catch (error) {
                    console.error('Ошибка загрузки статуса документов:', error);
                }
            }
        };
        loadDocsStatus();
    }, [user]);

    useEffect(() => {
        loadCars(1);
    }, [loadCars]);

    const applyFilters = () => {
        setActiveCategory(tempCategory);
        setActivePriceMin(tempPriceMin);
        setActivePriceMax(tempPriceMax);
        setActiveSpotId(tempSpotId);
    };

    const resetFilters = () => {
        setTempCategory('');
        setTempPriceMin('');
        setTempPriceMax('');
        setTempSpotId('');
        setActiveCategory('');
        setActivePriceMin('');
        setActivePriceMax('');
        setActiveSpotId('');
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            loadCars(newPage);
        }
    };

    const handleBook = async (carId, spotId) => {
        if (!isDocsVerified) {
            alert('Для аренды автомобиля необходимо подтвердить документы в личном кабинете');
            return;
        }
        
        try {
            const response = await axiosInstance.post(`/cars/${carId}/book`, { spot_id: spotId });
            alert(response.data.message);
            loadCars(pagination.page);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Ошибка бронирования';
            alert(errorMsg);
        }
    };

    const handleCancel = async (carId) => {
        try {
            const response = await axiosInstance.delete(`/cars/${carId}/book`);
            alert(response.data.message);
            loadCars(pagination.page);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Ошибка отмены';
            alert(errorMsg);
        }
    };

    if (loading) return <section className="text-center mt-5">Загрузка машин...</section>;

    return (
        <main className="custom-catalog-container">
            <Container>
                <h1 className="visually-hidden">Каталог автомобилей</h1>
                
                <section aria-labelledby="filters-heading">
                    <CatalogFilters 
                        selectedCategory={tempCategory}
                        onCategoryChange={setTempCategory}
                        priceMin={tempPriceMin}
                        onPriceMinChange={setTempPriceMin}
                        priceMax={tempPriceMax}
                        onPriceMaxChange={setTempPriceMax}
                        selectedSpotId={tempSpotId}
                        onSpotChange={setTempSpotId}
                        spots={spots}
                        onApply={applyFilters}
                        onReset={resetFilters}
                    />
                </section>
                
                {cars.length === 0 ? (
                    <p className="custom-catalog-empty">Нет машин по выбранным критериям</p>
                ) : (
                    <section aria-label="Список автомобилей">
                        <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4 custom-catalog-grid">
                            {cars.map(car => (
                                <Col key={car.id} className="custom-catalog-card">
                                    <CarCard 
                                        car={car}
                                        user={user}
                                        onBook={handleBook}
                                        onCancel={handleCancel}
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Pagination pagination={pagination} onPageChange={handlePageChange} />
                    </section>
                )}
            </Container>
        </main>
    );
}

export default CatalogPage;