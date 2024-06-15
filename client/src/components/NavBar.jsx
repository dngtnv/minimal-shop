import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    // Dispatch ON_LOGOUT action
    dispatch({ type: 'ON_LOGOUT' });
    dispatch({ type: 'RESET_CART' });
    // Remove logged-in user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('authUser');
    localStorage.removeItem('cart');
    // Redirect to home page
    navigate('/');
  }

  return (
    <nav className={styles.nav}>
      <div className={styles['nav-left']}>
        <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : styles['nav-link'])}>
          Home
        </NavLink>
        <NavLink to='shop' className={({ isActive }) => (isActive ? styles.active : styles['nav-link'])}>
          Shop
        </NavLink>
      </div>
      <div className={styles.logo}>
        <span>BOUTIQUE</span>
      </div>
      <div className={styles['nav-right']}>
        {isAuth && (
          <>
            <NavLink to='cart' className={({ isActive }) => (isActive ? styles.active : styles['nav-link'])}>
              <span className={styles['nav-icon']}>
                <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 20 20'>
                  <path
                    fill='currentColor'
                    d='M3 1a1 1 0 0 0 0 2h1.22l.305 1.222a.997.997 0 0 0 .01.042l1.358 5.43l-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 0 0 0-2H6.414l1-1H14a1 1 0 0 0 .894-.553l3-6A1 1 0 0 0 17 3H6.28l-.31-1.243A1 1 0 0 0 5 1zm13 15.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6.5 18a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3'
                  />
                </svg>
              </span>
              Cart
            </NavLink>
            <NavLink to='orders' className={({ isActive }) => (isActive ? styles.active : styles['nav-link'])}>
              <span className={styles['nav-icon']}>
                <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 16 16' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z'
                    clipRule='evenodd'
                  />
                  <path
                    fillRule='evenodd'
                    d='M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              Order
            </NavLink>
          </>
        )}
        {authUser && Object.keys(authUser).length !== 0 ? (
          <>
            <NavLink to={'/profile'} className={({ isActive }) => (isActive ? styles.active : styles['nav-link'])}>
              <span className={styles['nav-icon']}>
                <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 20 20'>
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6m-7 9a7 7 0 1 1 14 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              {authUser.fullName}
            </NavLink>
            <button onClick={handleLogout} className={styles['logout-btn']}>
              (Logout)
            </button>
          </>
        ) : (
          <NavLink to='login' className={({ isActive }) => (isActive ? styles.active : styles['nav-link'])}>
            <span className={styles['nav-icon']}>
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 20 20'>
                <path
                  fill='currentColor'
                  fillRule='evenodd'
                  d='M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6m-7 9a7 7 0 1 1 14 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
