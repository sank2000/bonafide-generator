import { useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@material-ui/core';

import Snack from 'contexts/Snack';
import { ButtonWithLoader, Modal } from 'components';
import { useAlStyles } from 'constants/classes';
import { handleChange } from 'functions';

export default function Add({ open, setOpen, setLoadData }) {
	const classes = useAlStyles();
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		name: '',
		profileImg: '',
		password: '',
		c_password: '',
		phoneNumber: '',
		email: ''
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
			await axios.post('/admin/new', postData);
			setLoading(false);
			setSnack({
				open: true,
				message: 'Admin successfully added!',
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

	return (
		<Modal title={'Add staff'} open={open} setOpen={setOpen} disableClose={loading}>
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
					label='Password'
					required
					type='password'
					name='password'
					value={data.password}
					onChange={handleChange(setData)}
				/>
				<TextField
					label='Confirm Password'
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
						onClick={() => {
							if (loading) return;
							setOpen(false);
						}}
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
