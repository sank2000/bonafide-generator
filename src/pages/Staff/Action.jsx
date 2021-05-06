import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableFooter,
	TablePagination,
	Paper,
	TableBody,
	Typography
} from '@material-ui/core';

import { StyledTableCell, StyledTableRow, TablePaginationAction } from 'components';
import { adminLayout } from 'constants/classes';

const useStyles = makeStyles({
	...adminLayout
});

export default function CustomPaginationActionsTable() {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const rowsPerPage = 5;
	const rows = [
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<section className={classes.section}>
			<Typography variant='h4' align='center' className={classes.title}>
				New Request
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
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, ind) => (
							<StyledTableRow key={ind}>
								<StyledTableCell component='th' scope='row'>
									{val.registerNo}
								</StyledTableCell>
								<StyledTableCell>{val.name}</StyledTableCell>
								<StyledTableCell>{val.degree}</StyledTableCell>
								<StyledTableCell>{val.department}</StyledTableCell>
								<StyledTableCell>{val.campus}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5]}
								colSpan={4}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								ActionsComponent={TablePaginationAction}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</section>
	);
}
