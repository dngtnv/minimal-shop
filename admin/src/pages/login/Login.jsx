import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import styles from '../login/Login.module.css';

const Login = () => {
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://minimal-shop.onrender.com/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Log:', data);
        localStorage.setItem('loggedIn', JSON.stringify(data.user));
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setError('Username or password is incorrect!');
      });
  };

  return (
    <main>
      <Header />
      <section className={styles['auth-wrapper']}>
        <div className={styles['auth-body']}>
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit} className={styles['auth-form']}>
            <input
              className={error ? styles.errorInput : ''}
              type='email'
              ref={emailRef}
              placeholder='Email'
              required
            />
            <input
              className={error ? styles.errorInput : ''}
              type='password'
              ref={passwordRef}
              placeholder='Password'
              required
            />
            <button type='submit'>Login</button>
          </form>
          <p className={styles.error}>{error}</p>
        </div>
      </section>
    </main>
  );
};

export default Login;
