import CircularProgress from '@material-ui/core/CircularProgress';

export default function ButtonLoader() {
	return (
		<>
			&nbsp;
			<CircularProgress size={15} style={{ color: 'white' }} />
		</>
	);
}
