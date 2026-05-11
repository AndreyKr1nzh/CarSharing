import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const steps = [
    {
        id: 1,
        icon: '/images/phone.svg',
        title: 'Выберите авто',
        text: 'Выберите подходящий автомобиль из нашего каталога'
    },
    {
        id: 2,
        icon: '/images/check.svg',
        title: 'Забронируйте',
        text: 'Забронируйте авто на нужное время'
    },
    {
        id: 3,
        icon: '/images/car.svg',
        title: 'Поехали!',
        text: 'Заберите машину и отправляйтесь в путь'
    },
    {
        id: 4,
        icon: '/images/finish.svg',
        title: 'Верните',
        text: 'Верните авто на любую удобную стоянку'
    }
];

function HowItWorks() {
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
        <section className="how-it-works" ref={sectionRef} aria-labelledby="how-it-works-title">
            <Container>
                <h2 id="how-it-works-title" className="section-title animate-fade-up">Как мы работаем</h2>
                <p className="section-subtitle animate-fade-up delay-1">Всего 4 простых шага</p>
                
                <Row>
                    {steps.map((step, index) => (
                        <Col key={step.id} md={6} lg={3} className="mb-4 mb-lg-0">
                            <article 
                                className={`step-card ${isVisible ? 'animate' : ''}`} 
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="step-icon" aria-hidden="true">
                                    <img 
                                        src={step.icon} 
                                        alt=""
                                        width="50"
                                        height="50"
                                    />
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-text">{step.text}</p>
                            </article>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default HowItWorks;