import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import colors from 'constants/colors';

const theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			primary: {
				main: colors.primary
			},
			secondary: {
				main: colors.secondary
			},
			warning: {
				main: colors.tomato
			}
		},
		typography: {
			fontFamily: ['Poppins', 'sans-serif'].join(',')
		},
		props: {
			MuiTextField: {
				fullWidth: true,
				variant: 'outlined'
			},
			MuiButton: {
				variant: 'contained',
				disableRipple: true
			}
		},
		overrides: {
			MuiFormControl: {
				root: {
					margin: '.5rem 0'
				}
			}
		}
	})
);

export default theme;
