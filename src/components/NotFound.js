import { Typography } from '@material-ui/core';

export default function NotFound({ description }) {
	return (
		<Typography
			variant='h5'
			align='center'
			color='primary'
			style={{ margin: '10px 0', fontWeight: 600 }}
		>
			{description ?? 'Empty'}
		</Typography>
	);
}
