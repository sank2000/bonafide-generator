import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab, TextField, Button, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';

import { StyledTableCell, StyledTableRow, Modal } from 'components';
import { adminLayout } from 'constants/classes';

const useStyles = makeStyles({
	...adminLayout
});

export default function Staff() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const data = [
		{
			name: 'Section 1',
			staff: 'Staff 1',
			noOfStudents: 10
		},
		{
			name: 'Section 2',
			staff: 'Staff 2',
			noOfStudents: 15
		},
		{
			name: 'Section 3',
			staff: 'Staff 3',
			noOfStudents: 17
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
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Staff</StyledTableCell>
							<StyledTableCell>No of students</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((val, ind) => {
							return (
								<StyledTableRow key={ind}>
									<StyledTableCell component='th' scope='row'>
										{ind + 1}
									</StyledTableCell>
									<StyledTableCell>{val.name}</StyledTableCell>
									<StyledTableCell>{val.staff}</StyledTableCell>
									<StyledTableCell>{val.noOfStudents}</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal title={'Add section'} open={open} setOpen={setOpen}>
				<form>
					<TextField label='Name' required name='name' />
					<TextField label='Staff ID' required name='staffID' />
					<Box display='flex' justifyContent='flex-end'>
						<Button
							variant='contained'
							color='primary'
							type='button'
							onClick={() => setOpen(false)}
							className={classes.cancelBtn}
						>
							Cancel
						</Button>
						<Button variant='contained' color='primary' type='submit'>
							Add
						</Button>
					</Box>
				</form>
			</Modal>
			<Fab color='secondary' className={classes.float} onClick={() => setOpen(true)}>
				<AddIcon />
			</Fab>
		</section>
	);
}
