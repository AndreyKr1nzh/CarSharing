import { Form, Button } from 'react-bootstrap';
import '../../styles/catalogFilters.css';

function CatalogFilters({ 
    selectedCategory, 
    onCategoryChange,
    priceMin,
    onPriceMinChange,
    priceMax,
    onPriceMaxChange,
    selectedSpotId,
    onSpotChange,
    spots = [],
    onApply,
    onReset 
}) {
    return (
        <section className="custom-filters-container" aria-labelledby="filters-title">
            <h2 id="filters-title" className="custom-filters-title">Фильтры</h2>
            
            <div className="custom-filters-group" role="search" aria-label="Поиск и фильтрация автомобилей">
                <div className="custom-filters-item">
                    <Form.Label htmlFor="category-select" className="custom-filters-label">Категория</Form.Label>
                    <Form.Select 
                        id="category-select"
                        value={selectedCategory} 
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="custom-filters-select"
                        aria-label="Выберите категорию автомобиля"
                    >
                        <option value="">Все</option>
                        <option value="Эконом">Эконом</option>
                        <option value="Комфорт">Комфорт</option>
                        <option value="Электромобиль">Электромобиль</option>
                    </Form.Select>
                </div>
                
                <div className="custom-filters-item">
                    <Form.Label htmlFor="price-min" className="custom-filters-label">Цена от (₽/мин)</Form.Label>
                    <Form.Control 
                        id="price-min"
                        type="number" 
                        value={priceMin} 
                        onChange={(e) => onPriceMinChange(e.target.value)} 
                        placeholder="мин"
                        className="custom-filters-input"
                        aria-label="Минимальная цена за минуту"
                    />
                </div>
                
                <div className="custom-filters-item">
                    <Form.Label htmlFor="price-max" className="custom-filters-label">Цена до (₽/мин)</Form.Label>
                    <Form.Control 
                        id="price-max"
                        type="number" 
                        value={priceMax} 
                        onChange={(e) => onPriceMaxChange(e.target.value)} 
                        placeholder="макс"
                        className="custom-filters-input"
                        aria-label="Максимальная цена за минуту"
                    />
                </div>
                
                <div className="custom-filters-item">
                    <Form.Label htmlFor="spot-select" className="custom-filters-label">Стоянка</Form.Label>
                    <Form.Select 
                        id="spot-select"
                        value={selectedSpotId} 
                        onChange={(e) => onSpotChange(e.target.value)}
                        className="custom-filters-select"
                        aria-label="Выберите стоянку"
                    >
                        <option value="">Все стоянки</option>
                        {spots.map(spot => (
                            <option key={spot.id} value={spot.id}>
                                {spot.name}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                
                <div className="custom-filters-buttons">
                    <Button 
                        onClick={onApply} 
                        className="custom-filters-btn-apply"
                        aria-label="Применить выбранные фильтры"
                    >
                        Применить
                    </Button>
                    <Button 
                        onClick={onReset} 
                        className="custom-filters-btn-reset ms-2"
                        aria-label="Сбросить все фильтры"
                    >
                        Сбросить
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default CatalogFilters;