import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';
import { rgba } from 'polished';

import colors from 'constants/colors';

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: rgba(colors.primary, 0.8),
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

export { StyledTableCell, StyledTableRow };
