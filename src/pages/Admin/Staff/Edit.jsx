import { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box, MenuItem } from '@material-ui/core';
import axios from 'axios';

import { Modal, Select, ButtonWithLoader } from 'components';
import { adminLayout } from 'constants/classes';
import Snack from 'contexts/Snack';
import { handleChange } from 'functions';

const useStyles = makeStyles({
	...adminLayout
});

export default function Edit({ open, setOpen, setLoadData, activeData }) {
	const classes = useStyles();
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		...activeData,
		password: '',
		c_password: '',
		section: activeData?.section?._id ?? ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		if (data.password !== data.c_password) {
			return setSnack({
				open: true,
				message: 'Password are not same',
				type: 'error'
			});
		}
		setLoading(true);
		const { c_password, ...postData } = data;
		try {
			await axios.put('/admin/staff/update', {
				...postData,
				id: activeData._id
			});
			setLoading(false);
			setSnack({
				open: true,
				message: 'Staff updated successfully!',
				type: 'success'
			});
			setTimeout(() => {
				setOpen(false);
				setLoadData(old => !old);
			}, 2000);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		setData({
			...activeData,
			password: '',
			c_password: '',
			section: activeData?.section?._id ?? ''
		});
	}, [activeData]);

	return (
		<Modal title={'Edit staff'} open={open} setOpen={setOpen} disableClose={loading}>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Name'
					required
					name='name'
					value={data.name}
					onChange={handleChange(setData)}
				/>
				<TextField
					label='Profile Img'
					required
					name='profileImg'
					value={data.profileImg}
					onChange={handleChange(setData)}
				/>
				<Select
					label='Designation'
					name='designation'
					value={data.designation}
					onChange={handleChange(setData)}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					<MenuItem value={'Professor'}>Professor</MenuItem>
					<MenuItem value={'Assistant Professor'}>Assistant Professor</MenuItem>
					<MenuItem value={'Teaching Fellow'}>Teaching Fellow</MenuItem>
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
				<TextField
					label='Section ID'
					required
					name='section'
					value={data.section}
					onChange={handleChange(setData)}
				/>
				<TextField
					label='Password'
					required
					type='password'
					name='password'
					value={data.password}
					onChange={handleChange(setData)}
				/>
				<TextField
					label='Conform Password'
					required
					type='password'
					name='c_password'
					value={data.c_password}
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
