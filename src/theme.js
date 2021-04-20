import { createMuiTheme } from '@material-ui/core/styles';
import colors from 'constants/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

export default theme;
