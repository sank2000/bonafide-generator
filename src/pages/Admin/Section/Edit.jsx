import { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import axios from 'axios';

import { Modal, ButtonWithLoader } from 'components';
import { useAlStyles } from 'constants/classes';
import { handleChange } from 'functions';
import Snack from 'contexts/Snack';

export default function Edit({ open, setOpen, activeDoc, setLoadData }) {
	const classes = useAlStyles();
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		name: activeDoc?.name ?? ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.put('/admin/section/update/name', {
				...data,
				id: activeDoc?._id
			});
			setLoading(false);
			setSnack({
				open: true,
				message: 'Section updated successfully !',
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
			name: activeDoc?.name ?? ''
		});
	}, [activeDoc]);

	return (
		<Modal title={'Edit section'} open={open} setOpen={setOpen} disableClose={loading}>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Name'
					required
					name='name'
					value={data.name}
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
