// Define function to save user info to local storage
export function addUserToLocalStorage(user) {
  // Get users from local storage or empty array
  const users = JSON.parse(localStorage.getItem('users')) || [];
  // Check if user already exists in local storage
  const duplicatedEmail = users.find((u) => u.email === user.email);
  // If user already exists return error
  if (duplicatedEmail) {
    return { ok: false, errorMsg: 'Email already exists' };
  }
  // If user does not exist then add user to local storage
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return { ok: true };
}
// Define function to authenticating with local storage
export function loginWithLocalStorage(user) {
  // Get users from local storage
  const users = JSON.parse(localStorage.getItem('users'));
  // Check if user does not exist in local storage return error
  if (!users) {
    return { ok: false, errorMsg: 'Invalid email or password' };
  }
  // Check if user exists in local storage
  const validUser = users.find((u) => u.email === user.email && u.password === user.password);
  // If user does not exist return error
  if (!validUser) {
    return { ok: false, errorMsg: 'Invalid email or password' };
  }

  return { ok: true, user: validUser };
}
// Define function to save cart to local storage
export function saveCart(state) {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('cart', serialState);
  } catch (err) {
    console.error(err);
  }
}
// Define function to load cart from local storage
export function loadCart() {
  try {
    const serialState = localStorage.getItem('cart');
    if (serialState === null) return undefined;
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
}
