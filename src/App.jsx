import { useState } from 'react';
import { createGlobalStyle, ThemeProvider as ScThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import colors from 'constants/colors';
import authInit from 'constants/authInit';
import Routers from './Routes';
import theme from 'theme';
import Auth from 'contexts/Auth';

export default function App() {
	const [auth, setAuth] = useState(
		localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : authInit
	);

	return (
		<ScThemeProvider theme={colors}>
			<GlobalStyles />
			<MuiThemeProvider theme={theme}>
				<Auth.Provider value={{ auth, setAuth }}>
					<Router>
						<Routers />
					</Router>
				</Auth.Provider>
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
