import { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box, MenuItem } from '@material-ui/core';
import axios from 'axios';

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
			await axios.put('/admin/staff/update', {
				...payload,
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
			...activeData
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
