import { TextField, Button, Box } from '@material-ui/core';

import { Modal } from 'components';
import { useAlStyles } from 'constants/classes';

export default function EditProfile({ open, setOpen }) {
	const classes = useAlStyles();

	return (
		<Modal title={'Edit Profile'} open={open} setOpen={setOpen}>
			<form>
				<TextField label='Email' required type='email' name='email' />
				<TextField label='Phone' required name='phone' />
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
						update
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
