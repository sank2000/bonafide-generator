import { Typography } from '@material-ui/core';

export default function RowTypography({ title, value }) {
	return (
		<tr>
			<td style={{ width: '40%' }}>
				<Typography variant='h6'>{title}</Typography>
			</td>
			<td>:</td>
			<td>
				<Typography variant='h6'>{value}</Typography>
			</td>
		</tr>
	);
}
