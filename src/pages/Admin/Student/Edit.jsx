import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { Modal } from 'components';
import { adminLayout } from 'constants/classes';

const useStyles = makeStyles({
	...adminLayout
});

export default function Edit({ open, setOpen }) {
	const classes = useStyles();
	const [selectedDate, handleDateChange] = useState(new Date());

	return (
		<Modal title={'Edit student'} open={open} setOpen={setOpen}>
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
				<TextField label='Conform Password' required type='password' name='c_password' />
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
						update
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
