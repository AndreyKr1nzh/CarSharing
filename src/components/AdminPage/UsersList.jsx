import { useState, useEffect } from 'react';
import { Table, Form, Alert, Spinner } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import '../../styles/usersList.css';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/admin/users');
            setUsers(response.data.data);
        } catch (error) {
            console.error('Ошибка:', error);
            setError('Ошибка загрузки пользователей');
        } finally {
            setLoading(false);
        }
    };

    const changeRole = async (userId, newRoleId) => {
        try {
            const response = await axiosInstance.put(`/admin/users/${userId}/role`, {
                role_id: newRoleId
            });
            setMessage(response.data.message);
            loadUsers();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Не удалось изменить роль');
            setTimeout(() => setError(''), 3000);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    if (loading) {
        return (
            <section className="custom-users-container text-center">
                <Spinner animation="border" variant="primary" className="custom-users-spinner" />
                <p className="custom-users-spinner-text mt-2">Загрузка пользователей...</p>
            </section>
        );
    }

    return (
        <section className="custom-users-container" aria-labelledby="users-list-title">
            <h2 id="users-list-title" className="custom-users-title">Пользователи</h2>
            
            {message && (
                <Alert 
                    variant="success" 
                    className="custom-users-alert-success"
                    role="alert"
                    aria-live="polite"
                >
                    {message}
                </Alert>
            )}
            {error && (
                <Alert 
                    variant="danger" 
                    className="custom-users-alert-danger"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </Alert>
            )}
            
            <Table 
                striped 
                bordered 
                hover 
                responsive 
                className="custom-users-table"
                aria-labelledby="users-list-title"
            >
                <caption className="visually-hidden">
                    Таблица пользователей с возможностью изменения роли
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Email</th>
                        <th scope="col">Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td style={{ width: '200px' }}>
                                <Form.Select 
                                    value={user.role_id}
                                    onChange={(e) => changeRole(user.id, parseInt(e.target.value))}
                                    size="sm"
                                    className="custom-users-select"
                                    aria-label={`Изменение роли пользователя ${user.username}`}
                                >
                                    <option value={2}>Пользователь</option>
                                    <option value={1}>Администратор</option>
                                </Form.Select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            {users.length === 0 && !loading && (
                <p className="custom-users-empty">Нет пользователей</p>
            )}
        </section>
    );
}

export default UsersList;