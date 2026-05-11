// client/src/components/Footer.jsx
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/header.css';

function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="custom-footer">
            <Container>
                <div className="py-4">
                    <Row>
                        <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                            <div className="custom-header-brand" style={{ fontSize: '1.2rem' }}>
                                <img src="/images/logo.svg" alt="Логотип CarSharing" width="120" height="40" />
                            </div>
                            <p className="custom-footer-text mt-2">
                                Удобный и быстрый каршеринг<br />
                                по всему городу
                            </p>
                        </Col>
                        
                        <Col md={4} className="text-center mb-3 mb-md-0">
                            <h2 className="custom-header-brand" style={{ fontSize: '1.2rem' }}>Контакты</h2>
                            <address className="custom-footer-text mt-2" style={{ fontStyle: 'normal' }}>
                                <a href="tel:+79157578769" className="custom-footer-link">+7 (915) 757-87-69</a><br />
                                <a href="mailto:supportCarShare@yandex.ru" className="custom-footer-link">supportCarShare@yandex.ru</a>
                            </address>
                        </Col>
                        
                        <Col md={4} className="text-center text-md-end mb-3 mb-md-0">
                            <h2 className="custom-header-brand" style={{ fontSize: '1.2rem' }}>Следите за нами</h2>
                            <div className="custom-footer-social mt-2">
                                <a 
                                    href="https://web.telegram.org" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="custom-footer-link"
                                    aria-label="Telegram (откроется в новой вкладке)"
                                >
                                    Telegram
                                </a>
                                <br />
                                <a 
                                    href="https://vk.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="custom-footer-link"
                                    aria-label="VK (откроется в новой вкладке)"
                                >
                                    VK
                                </a>
                                <br />
                                <a 
                                    href="https://max.ru" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="custom-footer-link"
                                    aria-label="Max (откроется в новой вкладке)"
                                >
                                    Max
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div>
                
                <div className="custom-footer-bottom text-center py-3">
                    <p className="mb-0">© 2026 CarShare. Все права защищены.</p>
                </div>
            </Container>
            
            {showScrollTop && (
                <button 
                    className="custom-scroll-top"
                    onClick={scrollToTop}
                    aria-label="Наверх"
                >
                    ↑
                </button>
            )}
        </footer>
    );
}

export default Footer;