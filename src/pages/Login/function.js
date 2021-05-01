export function login(setAuth, payload) {
	localStorage.setItem('auth', JSON.stringify(payload));
	setAuth(payload);
}
