import { makeStyles } from '@material-ui/core/styles';

const adminLayout = {
	section: {
		position: 'relative',
		minHeight: 'calc(100vh - 80px)'
	},
	float: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	table: {
		width: '90%',
		margin: '0 auto'
	},
	title: {
		margin: '10px 0',
		fontWeight: 600
	},
	cancelBtn: {
		marginRight: '10px'
	}
};

const useAlStyles = makeStyles({
	...adminLayout
});

export { adminLayout, useAlStyles };
