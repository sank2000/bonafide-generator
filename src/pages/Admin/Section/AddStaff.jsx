import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box } from '@material-ui/core';
import axios from 'axios';

import Snack from 'contexts/Snack';
import { ButtonWithLoader, Modal } from 'components';
import { adminLayout } from 'constants/classes';
import { handleChange } from 'functions';

const useStyles = makeStyles({
	...adminLayout
});

export default function AddStaff({ open, setOpen, sectionID, setLoadData }) {
	const classes = useStyles();
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		staffId: ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.put('/admin/section/update/staff', {
				...data,
				id: sectionID
			});
			setLoading(false);
			setSnack({
				open: true,
				message: 'Staff successfully added!',
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
		<Modal title={'Add Staff'} open={open} setOpen={setOpen} disableClose={loading}>
			<form onSubmit={handleSubmit}>
				<TextField label='Section ID' required value={sectionID} disabled />
				<TextField
					label='Staff ID'
					required
					name='staffId'
					value={data.staffId}
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
					<ButtonWithLoader loading={loading} text='Add' />
				</Box>
			</form>
		</Modal>
	);
}
