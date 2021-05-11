import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';

import ButtonLoader from './ButtonLoader';

export default function CustomDialog({
	title,
	description,
	loading,
	open,
	handleClose,
	handleConform
}) {
	return (
		<Dialog open={open} onClose={handleClose} disableBackdropClick>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					No
				</Button>
				<Button onClick={handleConform} color='primary' autoFocus>
					Yes {loading && <ButtonLoader />}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
