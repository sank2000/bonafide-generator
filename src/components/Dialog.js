import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';

export default function CustomDialog({ title, description, open, handleClose, handleConform }) {
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
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}
