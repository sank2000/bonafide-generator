import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: '100%'
	}
}));

export default function SelectCustom({ label, name, value, onChange, children }) {
	const classes = useStyles();

	return (
		<FormControl required variant='outlined' className={classes.formControl}>
			<InputLabel>{label}</InputLabel>
			<Select fullWidth value={value} name={name} onChange={onChange} label={label}>
				{children}
			</Select>
		</FormControl>
	);
}
