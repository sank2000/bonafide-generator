import { useState, useContext } from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import axios from 'axios';

import Snack from 'contexts/Snack';
import { ButtonWithLoader, Modal } from 'components';
import { useAlStyles } from 'constants/classes';
import { handleChange } from 'functions';

export default function AddStudent({ open, setOpen, sectionID, setLoadData }) {
	const classes = useAlStyles();
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		studentId: ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.put('/admin/section/update/student', {
				...data,
				id: sectionID
			});
			setLoading(false);
			setSnack({
				open: true,
				message: 'Student successfully added!',
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
		<Modal title={'Add Student'} open={open} setOpen={setOpen} disableClose={loading}>
			<form onSubmit={handleSubmit}>
				<TextField label='Section' required value={sectionID} disabled />
				<TextField
					label='Student ID'
					required
					name='studentId'
					value={data.studentId}
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
