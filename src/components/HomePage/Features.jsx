import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const features = [
    {
        id: 1,
        icon: '/images/ruble.svg',
        title: 'Низкие цены',
        text: 'Цены от 7 ₽/минуту. Экономьте с нами'
    },
    {
        id: 2,
        icon: '/images/clock.svg',
        title: 'Круглосуточно',
        text: 'Бронируйте и арендуйте авто 24/7'
    },
    {
        id: 3,
        icon: '/images/point.svg',
        title: 'Удобные стоянки',
        text: 'Более 50 стоянок по всему городу'
    },
    {
        id: 4,
        icon: '/images/phone2.svg',
        title: 'Техподдержка',
        text: 'Поможем в любой ситуации'
    }
];

function Features() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="features" ref={sectionRef} aria-labelledby="features-title">
            <Container>
                <h2 id="features-title" className="section-title animate-fade-up">Почему выбирают нас</h2>
                <p className="section-subtitle animate-fade-up delay-1">Наши преимущества</p>
                
                <Row>
                    {features.map((feature, index) => (
                        <Col key={feature.id} md={6} lg={3} className="mb-4 mb-lg-0">
                            <article 
                                className={`feature-card ${isVisible ? 'animate' : ''}`} 
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="feature-icon" aria-hidden="true">
                                    <img 
                                        src={feature.icon} 
                                        alt=""
                                        width="60"
                                        height="60"
                                    />
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-text">{feature.text}</p>
                            </article>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default Features;