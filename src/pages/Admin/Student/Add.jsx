import { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box, MenuItem } from '@material-ui/core';
import { getYear } from 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import axios from 'axios';

import Snack from 'contexts/Snack';
import { ButtonWithLoader, Modal, Select } from 'components';
import { useAlStyles } from 'constants/classes';
import { handleChange } from 'functions';

const initialValue = {
	registerNumber: '',
	name: '',
	profileImg: '',
	degree: '',
	department: '',
	gender: '',
	campus: '',
	phoneNumber: '',
	email: '',
	section: ''
};

export default function Add({ open, setOpen, setLoadData }) {
	const classes = useAlStyles();
	const [selectedDOB, handleDOBChange] = useState(new Date());
	const [selectedBatch, handleBatchChange] = useState(new Date());
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [section, setSection] = useState([]);
	const [data, setData] = useState(initialValue);

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		const { c_password, ...postData } = data;
		try {
			await axios.post('/admin/student/new', {
				...postData,
				dateOfBirth: format(new Date(selectedDOB), 'yyyy-MM-dd'),
				batch: `${getYear(selectedBatch)} - ${getYear(selectedBatch) + 4}`
			});
			setLoading(false);
			setSnack({
				open: true,
				message: 'Student successfully added!',
				type: 'success'
			});
			setData(initialValue);
			setTimeout(() => {
				setOpen(false);
				setLoadData(old => !old);
			}, 2000);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	const getSection = async () => {
		try {
			const { data: resData } = await axios.get('/admin/section/all');
			setSection(resData.data);
		} catch (error) {
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		getSection();
	}, []);

	return (
		<Modal title={'Add student'} open={open} setOpen={setOpen} disableClose={loading}>
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
				<Select
					label='Section'
					name='section'
					value={data.section}
					onChange={handleChange(setData)}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{section.map((val, ind) => {
						return (
							<MenuItem key={ind} value={val._id}>
								{val.name}
							</MenuItem>
						);
					})}
				</Select>
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
					<ButtonWithLoader loading={loading} text='Add' />
				</Box>
			</form>
		</Modal>
	);
}
