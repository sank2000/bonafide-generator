import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box } from '@material-ui/core';

import { Modal } from 'components';
import { adminLayout } from 'constants/classes';

const useStyles = makeStyles({
	...adminLayout
});

export default function Edit({ open, setOpen }) {
	const classes = useStyles();

	return (
		<Modal title={'Edit section'} open={open} setOpen={setOpen}>
			<form>
				<TextField label='Name' required name='name' />
				<TextField label='Staff ID' required name='staffID' />
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
