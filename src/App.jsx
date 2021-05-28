import { useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider as ScThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import colors from 'constants/colors';
import authInit from 'constants/authInit';
import snackInit from 'constants/snackInit';
import Routers from './Routes';
import theme from 'theme';
import Auth from 'contexts/Auth';
import Snack from 'contexts/Snack';
import { Alert } from 'components';
import { logout } from 'pages/Login/function';

axios.defaults.baseURL = process.env.REACT_APP_API ?? 'http://localhost:4000/';

export default function App() {
	const [auth, setAuth] = useState(() =>
		localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : authInit
	);

	const [snack, setSnack] = useState(snackInit);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnack(old => ({
			...old,
			open: false
		}));
	};

	const errorComposer = error => {
		return () => {
			const statusCode = error.response ? error.response.status : null;
			const commonSnack = { type: 'error', open: true };

			if (statusCode === 400 || statusCode === 404) {
				setSnack({
					...commonSnack,
					message:
						error?.response?.data?.error ?? 'Something went wrong ! Please try again later 😪'
				});
			} else if (statusCode === 401) {
				setSnack({
					...commonSnack,
					message: 'Please login to access this resource'
				});
				setTimeout(() => {
					logout(setAuth);
				}, 3000);
			} else {
				setSnack({
					...commonSnack,
					message: 'Something went wrong ! Please try again later'
				});
			}
		};
	};

	// Set the AUTH token for any request
	axios.interceptors.request.use(function (req) {
		const token = localStorage.getItem('auth')
			? JSON.parse(localStorage.getItem('auth')).token
			: '';
		req.headers.Authorization = `Bearer ${token}`;
		return req;
	});

	axios.interceptors.response.use(undefined, function (error) {
		error.handleGlobally = errorComposer(error);
		return Promise.reject(error);
	});

	const wakeUpAPI = async () => {
		try {
			await axios.get('/ping');
		} catch (error) {
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			wakeUpAPI();
		}
	}, []);

	return (
		<ScThemeProvider theme={colors}>
			<GlobalStyles />
			<MuiThemeProvider theme={theme}>
				<Snack.Provider value={{ snack, setSnack }}>
					<Auth.Provider value={{ auth, setAuth }}>
						<Router>
							<Routers />
						</Router>
					</Auth.Provider>
				</Snack.Provider>
				<Snackbar open={snack.open} autoHideDuration={3000} onClose={handleClose}>
					<Alert onClose={handleClose} severity={snack.type}>
						{snack.message}
					</Alert>
				</Snackbar>
			</MuiThemeProvider>
		</ScThemeProvider>
	);
}

const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: .5rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.primary};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.secondary};
  }

`;
