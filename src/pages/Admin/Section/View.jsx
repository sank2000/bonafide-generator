import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	Button,
	Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { StyledTableCell, StyledTableRow, Modal } from 'components';
import { adminLayout } from 'constants/classes';

const useStyles = makeStyles({
	...adminLayout
});
const data = [
	{
		registerNo: '810018104080',
		name: 'Name',
		degree: 'BE',
		department: 'CSE',
		campus: 'BIT'
	},
	{
		registerNo: '810018104081',
		name: 'Name',
		degree: 'BE',
		department: 'CSE',
		campus: 'BIT'
	},
	{
		registerNo: '810018104082',
		name: 'Name',
		degree: 'BE',
		department: 'CSE',
		campus: 'BIT'
	}
];

export default function View({ open, setOpen }) {
	const classes = useStyles();
	return (
		<Modal title={'View'} open={open} setOpen={setOpen}>
			<TableContainer component={Paper} className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>Register No</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Degree</StyledTableCell>
							<StyledTableCell>Department</StyledTableCell>
							<StyledTableCell>Campus</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((val, ind) => {
							return (
								<StyledTableRow key={ind}>
									<StyledTableCell component='th' scope='row'>
										{val.registerNo}
									</StyledTableCell>
									<StyledTableCell>{val.degree}</StyledTableCell>
									<StyledTableCell>{val.name}</StyledTableCell>
									<StyledTableCell>{val.department}</StyledTableCell>
									<StyledTableCell>{val.campus}</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Box display='flex' justifyContent='flex-end'>
				<Button variant='contained' color='primary' type='button' onClick={() => setOpen(false)}>
					close
				</Button>
			</Box>
		</Modal>
	);
}
