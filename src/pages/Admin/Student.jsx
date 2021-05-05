import { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab, TextField, Button, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { StyledTableCell, StyledTableRow, Modal } from 'components';
import { adminLayout } from 'constants/classes';

const useStyles = makeStyles({
	...adminLayout
});

export default function Student() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [selectedDate, handleDateChange] = useState(new Date());
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

	return (
		<section className={classes.section}>
			<Typography variant='h4' align='center' className={classes.title}>
				List
			</Typography>
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
			<Modal title={'Add student'} open={open} setOpen={setOpen}>
				<form>
					<TextField label='Register No' required name='registerNo' />
					<TextField label='Name' required name='name' />
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							label='DOB'
							required
							format='dd - MM - yyyy'
							inputVariant='outlined'
							value={selectedDate}
							onChange={handleDateChange}
						/>
					</MuiPickersUtilsProvider>
					<TextField label='Image URL' required name='imageURL' />
					<TextField label='Degree' required name='degree' />
					<TextField label='Department' required name='department' />
					<TextField label='Campus' required name='campus' />
					<TextField label='Batch' required name='batch' />
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
