import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
    {
        id: 1,
        title: 'Арендуй авто за минуту',
        subtitle: 'Множество авто на любой вкус и цвет',
        bgImage: '/images/cars1.png',
        btnText: 'Выбрать авто',
        link: '/catalog'
    },
    {
        id: 2,
        title: 'Электромобили уже здесь',
        subtitle: 'Экологично и выгодно',
        bgImage: '/images/cars2.png',
        btnText: 'Подробнее',
        link: '/catalog?category=Электромобиль'
    },
    {
        id: 3,
        title: '24/7 Поддержка',
        subtitle: 'Мы всегда на связи',
        bgImage: '/images/photo3.png',
        btnText: 'Связаться',
        link: '/map'
    }
];

function HeroSlider() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleButtonClick = () => {
        navigate(slides[currentSlide].link);
    };

    return (
        <section className="hero-slider" aria-label="Слайдер с акциями" aria-roledescription="карусель">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className="slide"
                    style={{
                        backgroundImage: `url(${slide.bgImage})`,
                        display: index === currentSlide ? 'flex' : 'none'
                    }}
                    role="group"
                    aria-roledescription="слайд"
                    aria-label={`${index + 1} из ${slides.length}: ${slide.title}`}
                    aria-hidden={index !== currentSlide}
                >
                    <div className="slide-overlay" aria-hidden="true"></div>
                    <div className="slide-content">
                        <h1 className="slide-title">{slide.title}</h1>
                        <p className="slide-subtitle">{slide.subtitle}</p>
                        <button 
                            className="slide-btn" 
                            onClick={handleButtonClick}
                            aria-label={`${slide.btnText}: ${slide.title}`}
                        >
                            {slide.btnText}
                        </button>
                    </div>
                </div>
            ))}
            
            <button 
                className="slider-arrow prev" 
                onClick={prevSlide}
                aria-label="Предыдущий слайд"
            >
                ‹
            </button>
            <button 
                className="slider-arrow next" 
                onClick={nextSlide}
                aria-label="Следующий слайд"
            >
                ›
            </button>
            
            <div className="slider-dots" role="tablist" aria-label="Навигация по слайдам">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        role="tab"
                        aria-selected={index === currentSlide}
                        aria-label={`Перейти к слайду ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default HeroSlider;