import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Refs for inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  // State for error messages
  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // Get values from inputs
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // Validation input data
    const isNotEmpty = email !== '' && password !== '';
    const isValidPassword = password.length >= 8;

    if (!isNotEmpty) {
      setFormIsInvalid(true);
      return;
    }
    if (!isValidPassword) {
      setPasswordIsInvalid(true);
      return;
    }
    setFormIsInvalid(false);
    setPasswordIsInvalid(false);
    try {
      const response = await fetch('https://minimal-shop.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        passwordRef.current.value = '';
        throw new Error('A user with this email could not be found.');
      }

      const data = await response.json();
      console.log(data);
      // Dispatch ON_LOGIN action with user data
      dispatch({ type: 'ON_LOGIN', payload: { userId: data.userId, username: data.username } });
      localStorage.setItem('token', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      // Navigate to home page
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <section className={styles['login-wrapper']}>
      <div className={styles['login-form']}>
        <h1>Sign In</h1>
        {passwordIsInvalid && <p className={styles['error-msg']}>Password must be at least 8 characters long!</p>}
        {formIsInvalid && <p className={styles['error-msg']}>All fields are required!</p>}
        {error && <p className={styles['error-msg']}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input ref={emailRef} type='email' name='email' placeholder='Email' />
          </div>
          <div>
            <input ref={passwordRef} type='password' name='password' placeholder='Password' />
          </div>
          <button className={styles['signup-btn']}>SIGN IN</button>
        </form>
        <div className={styles['form-footer']}>
          <p>
            Create an account?
            <span>
              <Link to={'/register'}>Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
