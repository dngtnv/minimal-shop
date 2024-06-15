import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUserToLocalStorage } from '../../utils/localStorage.js';
import styles from './Register.module.css';

const Register = () => {
  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [phoneIsInvalid, setPhoneIsInvalid] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Get form data
      const formData = new FormData(e.target);
      // Convert form data to object
      const fd = Object.fromEntries(formData);
      // Validation input data
      const isNotEmpty = Object.values(fd).every((el) => el !== '');
      const isValidPassword = fd.password.length >= 8;
      const isValidPhone = fd.phone.length >= 10;

      if (!isNotEmpty) {
        setFormIsInvalid(true);
        return;
      }
      if (!isValidPassword) {
        setPasswordIsInvalid(true);
        return;
      }
      if (!isValidPhone) {
        setPhoneIsInvalid(true);
        return;
      }

      setPhoneIsInvalid(false);
      setPasswordIsInvalid(false);
      setFormIsInvalid(false);

      const response = await fetch('https://minimal-shop.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fd),
      });

      if (response.status === 422) {
        throw new Error("Validation failed. Make sure the email address isn't used yet!");
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log('Error!');
        throw new Error('Creating a user failed!');
      }

      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError(err);
    }

    // Store new user to local storage
    // const response = addUserToLocalStorage(data);

    // if (!response.ok) {
    //   // Show error message
    //   alert(response.errorMsg);
    //   return;
    // }
  }

  return (
    <section className={styles['register-wrapper']}>
      <div className={styles['register-form']}>
        <h1>Sign Up</h1>
        {phoneIsInvalid && <p className={styles['error-msg']}>Phone must be at least 10 characters long!</p>}
        {passwordIsInvalid && <p className={styles['error-msg']}>Password must be at least 8 characters long!</p>}
        {formIsInvalid && <p className={styles['error-msg']}>All fields are required!</p>}
        {error && <p className={styles['error-msg']}>{error.message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input type='text' name='fullName' placeholder='Full Name' />
          </div>
          <div>
            <input type='email' name='email' placeholder='Email' />
          </div>
          <div>
            <input type='password' name='password' placeholder='Password' />
          </div>
          <div>
            <input type='tel' name='phone' placeholder='Phone' />
          </div>
          <button className={styles['signup-btn']}>SIGN UP</button>
        </form>
        <div className={styles['form-footer']}>
          <p>
            Login?
            <span>
              <Link to={'/login'}>Click</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
