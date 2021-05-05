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
			<Modal title={'Add staff'} open={open} setOpen={setOpen}>
				<form>
					<TextField label='ID' required name='id' />
					<TextField label='Name' required name='name' />
					<TextField label='Image URL' required name='imageURL' />
					<TextField label='Designation' required name='designation' />
					<TextField label='Department' required name='department' />
					<TextField label='Campus' required name='campus' />
					<TextField label='Phone' required name='phone' />
					<TextField label='Email' type='email' required name='email' />
					<TextField label='Section ID' required name='sectionID' />
					<TextField label='Password' required type='password' name='password' />
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
