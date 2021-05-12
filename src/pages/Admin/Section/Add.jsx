import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box } from '@material-ui/core';
import axios from 'axios';

import { Modal, ButtonLoader } from 'components';
import { adminLayout } from 'constants/classes';
import { handleChange } from 'functions';
import Snack from 'contexts/Snack';

const useStyles = makeStyles({
	...adminLayout
});

export default function Add({ open, setOpen, setLoadData }) {
	const classes = useStyles();
	const { setSnack } = useContext(Snack);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		name: ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post('/admin/section/new', data);
			setLoading(false);
			setSnack({
				open: true,
				message: 'Section created successfully !',
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
		<Modal title={'Add section'} open={open} setOpen={setOpen} disableClose={loading}>
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
					<Button variant='contained' color='primary' type='submit'>
						Add {loading && <ButtonLoader />}
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
