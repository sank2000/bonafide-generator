import {
  createGlobalStyle,
  ThemeProvider as ScThemeProvider,
} from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import colors from 'constants/colors';
import Routers from './Routers';
import theme from 'theme';

export default function App() {
  return (
    <ScThemeProvider theme={colors}>
      <GlobalStyles />
      <MuiThemeProvider theme={theme}>
        <Router>
          <Routers />
        </Router>
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
