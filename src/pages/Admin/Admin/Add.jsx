import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box } from '@material-ui/core';

import { Modal } from 'components';
import { adminLayout } from 'constants/classes';

const useStyles = makeStyles({
	...adminLayout
});

export default function Add({ open, setOpen }) {
	const classes = useStyles();

	return (
		<Modal title={'Add Admin'} open={open} setOpen={setOpen}>
			<form>
				<TextField label='Name' required name='name' />
				<TextField label='Image URL' required name='imageURL' />
				<TextField label='Phone' required name='phone' />
				<TextField label='Email' type='email' required name='email' />
				<TextField label='Password' required type='password' name='password' />
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
						Add
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
