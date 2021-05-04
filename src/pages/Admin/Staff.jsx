import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';

import { StyledTableCell, StyledTableRow } from 'components';

const useStyles = makeStyles({
	section: {
		position: 'relative',
		minHeight: 'calc(100vh - 80px)'
	},
	float: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	table: {
		width: '90%',
		margin: '0 auto'
	},
	title: {
		margin: '10px 0',
		fontWeight: 600
	}
});

export default function Staff() {
	const classes = useStyles();
	const data = [
		{
			name: 'Staff 1',
			designation: 'Assistant Professor',
			department: 'CSE',
			campus: 'BIT',
			phone: 9876543210
		},
		{
			name: 'Staff 2',
			designation: 'Assistant Professor',
			department: 'CSE',
			campus: 'BIT',
			phone: 9876543210
		},
		{
			name: 'Staff 3',
			designation: 'Assistant Professor',
			department: 'IT',
			campus: 'BIT',
			phone: 9876543210
		}
	];

	return (
		<section className={classes.section}>
			<Typography variant='h4' align='center' className={classes.title}>
				List
			</Typography>
			<TableContainer component={Paper} className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Designation</StyledTableCell>
							<StyledTableCell>Department</StyledTableCell>
							<StyledTableCell>Campus</StyledTableCell>
							<StyledTableCell>Phone</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((val, ind) => {
							return (
								<StyledTableRow key={ind}>
									<StyledTableCell component='th' scope='row'>
										{val.name}
									</StyledTableCell>
									<StyledTableCell>{val.designation}</StyledTableCell>
									<StyledTableCell>{val.department}</StyledTableCell>
									<StyledTableCell>{val.campus}</StyledTableCell>
									<StyledTableCell>{val.phone}</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Fab color='secondary' className={classes.float}>
				<AddIcon />
			</Fab>
		</section>
	);
}
