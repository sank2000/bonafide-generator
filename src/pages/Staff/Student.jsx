import { Table, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { StyledTableCell, StyledTableRow } from 'components';
import { useAlStyles } from 'constants/classes';

export default function Student() {
	const classes = useAlStyles();
	const data = [
		{
			registerNo: '810018104080',
			name: 'Name',
			degree: 'BE',
			department: 'CSE',
			campus: 'BIT'
		},
		{
			registerNo: '810018104081',
			name: 'Name',
			degree: 'BE',
			department: 'CSE',
			campus: 'BIT'
		},
		{
			registerNo: '810018104082',
			name: 'Name',
			degree: 'BE',
			department: 'CSE',
			campus: 'BIT'
		}
	];

	return (
		<section className={classes.section}>
			<Typography variant='h4' align='center' className={classes.title}>
				List
			</Typography>
			<TableContainer component={Paper} className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>Register No</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Degree</StyledTableCell>
							<StyledTableCell>Department</StyledTableCell>
							<StyledTableCell>Campus</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((val, ind) => {
							return (
								<StyledTableRow key={ind}>
									<StyledTableCell component='th' scope='row'>
										{val.registerNo}
									</StyledTableCell>
									<StyledTableCell>{val.name}</StyledTableCell>
									<StyledTableCell>{val.degree}</StyledTableCell>
									<StyledTableCell>{val.department}</StyledTableCell>
									<StyledTableCell>{val.campus}</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</section>
	);
}
