import authInit from 'constants/authInit';

export function login(setAuth, payload) {
	localStorage.setItem('auth', JSON.stringify(payload));
	setAuth(payload);
}

export function logout(setAuth) {
	localStorage.removeItem('auth');
	setAuth(authInit);
}
