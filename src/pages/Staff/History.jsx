import { useState, useEffect } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableFooter,
	TablePagination,
	Paper,
	TableBody,
	Typography,
	IconButton
} from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import axios from 'axios';

import {
	StyledTableCell,
	StyledTableRow,
	TablePaginationAction,
	PageLoader,
	NotFound
} from 'components';
import { useAlStyles } from 'constants/classes';
import View from '../Admin/Student/View';

export default function CustomPaginationActionsTable({ loadData }) {
	const classes = useAlStyles();
	const [page, setPage] = useState(0);
	const rowsPerPage = 5;
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [openView, setOpenView] = useState(false);
	const [activeDoc, setActiveDoc] = useState({});

	const getHistory = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/staff/bonafide/history');
			setData(resData.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	useEffect(() => {
		getHistory();

		//eslint-disable-next-line
	}, [loadData]);

	return (
		<div style={{ marginTop: '50px' }}>
			<Typography variant='h4' align='center' className={classes.title}>
				History
			</Typography>
			{loading ? (
				<PageLoader />
			) : (
				<TableContainer component={Paper} className={classes.table}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>Register No</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Degree</StyledTableCell>
								<StyledTableCell>Department</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>View</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(({ studentID: val, status }, ind) => (
									<StyledTableRow key={ind}>
										<StyledTableCell component='th' scope='row'>
											{val.registerNumber}
										</StyledTableCell>
										<StyledTableCell>{val.name}</StyledTableCell>
										<StyledTableCell>{val.degree}</StyledTableCell>
										<StyledTableCell>{val.department}</StyledTableCell>
										<StyledTableCell style={{ textTransform: 'capitalize' }}>
											{status}
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={() => {
													setActiveDoc(val);
													setOpenView(true);
												}}
											>
												<VisibilityOutlinedIcon />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
								))}
						</TableBody>
						{data.length !== 0 && (
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5]}
										colSpan={4}
										count={data.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={handleChangePage}
										ActionsComponent={TablePaginationAction}
									/>
								</TableRow>
							</TableFooter>
						)}
					</Table>
					{data.length === 0 && <NotFound description='No history found !' />}
				</TableContainer>
			)}
			<View open={openView} setOpen={setOpenView} data={activeDoc} />
		</div>
	);
}
