import { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import { getYear, format } from 'date-fns';

import { Modal, Select, ButtonWithLoader } from 'components';
import { useAlStyles } from 'constants/classes';
import Snack from 'contexts/Snack';
import { handleChange } from 'functions';

export default function Edit({ open, setOpen, setLoadData, activeData }) {
	const classes = useAlStyles();
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		...activeData
	});
	const [selectedDOB, handleDOBChange] = useState(new Date());
	const [selectedBatch, handleBatchChange] = useState(new Date());

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const payload = {
				...data
			};
			delete payload._id;
			delete payload.__v;
			delete payload.section;
			await axios.put('/admin/student/update', {
				...payload,
				dateOfBirth: format(new Date(selectedDOB), 'yyyy-MM-dd'),
				batch: `${getYear(selectedBatch)} - ${getYear(selectedBatch) + 4}`,
				id: activeData._id
			});
			setLoading(false);
			setSnack({
				open: true,
				message: 'Student updated successfully!',
				type: 'success'
			});
			setTimeout(() => {
				setLoadData(old => !old);
				setOpen(false);
			}, 2000);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		if (activeData) {
			setData({
				...activeData
			});
			handleDOBChange(new Date(activeData.dateOfBirth));
			handleBatchChange(new Date(activeData.batch?.split(' ')[0]));
		}
	}, [activeData]);

	return (
		<Modal title={'Edit student'} open={open} setOpen={setOpen} disableClose={loading}>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Register No'
					required
					name='registerNumber'
					value={data.registerNumber}
					onChange={handleChange(setData)}
				/>
				<TextField
					label='Name'
					required
					name='name'
					value={data.name}
					onChange={handleChange(setData)}
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						label='DOB'
						required
						format='dd - MM - yyyy'
						inputVariant='outlined'
						value={selectedDOB}
						onChange={handleDOBChange}
					/>
				</MuiPickersUtilsProvider>
				<TextField
					label='Profile Image'
					required
					name='profileImg'
					value={data.profileImg}
					onChange={handleChange(setData)}
				/>
				<Select name='degree' label='Degree' value={data.degree} onChange={handleChange(setData)}>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					<MenuItem value={'B.E'}>B.E</MenuItem>
					<MenuItem value={'B.Tech'}>B.Tech</MenuItem>
					<MenuItem value={'M.E'}>M.E</MenuItem>
					<MenuItem value={'M.Tech'}>M.Tech</MenuItem>
				</Select>
				<Select
					name='department'
					label='Department'
					value={data.department}
					onChange={handleChange(setData)}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					<MenuItem value={'CSE'}>CSE</MenuItem>
					<MenuItem value={'IT'}>IT</MenuItem>
					<MenuItem value={'ECE'}>ECE</MenuItem>
					<MenuItem value={'EEE'}>EEE</MenuItem>
				</Select>
				<Select name='gender' label='Gender' value={data.gender} onChange={handleChange(setData)}>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					<MenuItem value={'male'}>MALE</MenuItem>
					<MenuItem value={'female'}>FEMALE</MenuItem>
				</Select>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						views={['year']}
						label='Batch Starting'
						required
						inputVariant='outlined'
						value={selectedBatch}
						onChange={handleBatchChange}
					/>
				</MuiPickersUtilsProvider>
				<TextField
					label='Campus'
					required
					name='campus'
					value={data.campus}
					onChange={handleChange(setData)}
				/>
				<TextField
					label='Phone Number'
					required
					name='phoneNumber'
					value={data.phoneNumber}
					onChange={handleChange(setData)}
				/>
				<TextField
					label='Email'
					type='email'
					required
					name='email'
					value={data.email}
					onChange={handleChange(setData)}
				/>
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
					<ButtonWithLoader loading={loading} text='Update' />
				</Box>
			</form>
		</Modal>
	);
}
