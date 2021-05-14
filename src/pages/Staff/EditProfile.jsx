import { TextField, Button, Box } from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { Modal, ButtonWithLoader } from 'components';
import { useAlStyles } from 'constants/classes';
import Snack from 'contexts/Snack';
import { handleChange } from 'functions';

export default function EditProfile({ open, setOpen, data, setData }) {
	const classes = useAlStyles();
	const [loading, setLoading] = useState(false);
	const { setSnack } = useContext(Snack);
	const [newData, setNewData] = useState({
		phoneNumber: data.phoneNumber,
		email: data.email
	});

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.put('/staff/update', {
				...newData
			});
			setLoading(false);
			setData(old => ({
				...old,
				...newData
			}));
			setSnack({
				open: true,
				message: 'Details updated successfully!',
				type: 'success'
			});
			setTimeout(() => {
				setOpen(false);
			}, 2000);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		setNewData({
			phoneNumber: data.phoneNumber,
			email: data.email
		});
	}, [data]);

	return (
		<Modal title={'Edit Profile'} open={open} setOpen={setOpen} disableClose={loading}>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Phone Number'
					required
					name='phoneNumber'
					value={newData.phoneNumber}
					onChange={handleChange(setNewData)}
				/>
				<TextField
					label='Email'
					type='email'
					required
					name='email'
					value={newData.email}
					onChange={handleChange(setNewData)}
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
