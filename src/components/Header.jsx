import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '../styles/header.css';

function Header({ user }) {
    const isAdmin = user && Number(user.role_id) === 1;

    return (
        <header className="custom-header">
            <Navbar expand="lg" className="mb-0">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="custom-header-brand">
                        <img src="/images/logo.svg" alt="CarSharing" width="120" height="40" />
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-header-toggler" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                        <Nav className="custom-header-nav" as="nav" aria-label="Основная навигация">
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>
                            <Nav.Link as={Link} to="/catalog">Каталог</Nav.Link>
                            <Nav.Link as={Link} to="/map">Карта парковок</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                    <div className="custom-header-auth">
                        {user ? (
                            <NavDropdown 
                                title={
                                    <span className="name">
                                        {user.username}
                                    </span>
                                } 
                                id="user-dropdown"
                                align="end"
                                className="custom-header-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/profile">
                                    Личный кабинет
                                </NavDropdown.Item>
                                
                                {isAdmin && (
                                    <NavDropdown.Item as={Link} to="/admin">
                                        Админ-панель
                                    </NavDropdown.Item>
                                )}
                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/login">
                                    Выйти
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Войти</Nav.Link>
                                <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
                            </>
                        )}
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;