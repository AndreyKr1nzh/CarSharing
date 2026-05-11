import { Container } from 'react-bootstrap';
import HeroSlider from './HeroSlider';
import HowItWorks from './HowItWorks';
import Features from './Features';
import '../../styles/homePage.css';

function HomePage() {
    return (
        <main>
            <Container className="mt-4" as="section" aria-label="Промо-слайдер">
                <HeroSlider />
            </Container>
            
            <HowItWorks />
            
            <Container as="section" aria-label="Преимущества сервиса">
                <Features />
            </Container>
        </main>
    );
}

export default HomePage;