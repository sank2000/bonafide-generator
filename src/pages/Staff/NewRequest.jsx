import { useState, useEffect, useContext } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	Typography,
	IconButton
} from '@material-ui/core';
import axios from 'axios';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import { StyledTableCell, StyledTableRow, PageLoader, NotFound, Dialog } from 'components';
import { useAlStyles } from 'constants/classes';
import View from '../Admin/Student/View';
import Snack from 'contexts/Snack';

export default function NewRequest({ loadData, setLoadData }) {
	const classes = useAlStyles();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [openView, setOpenView] = useState(false);
	const [openAction, setOpenAction] = useState(false);
	const [actionData, setActionData] = useState({
		id: '',
		status: ''
	});
	const [openAdditionLoader, setOpenAdditionLoader] = useState(false);
	const [activeDoc, setActiveDoc] = useState({});
	const { setSnack } = useContext(Snack);

	const getApplied = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/staff/bonafide/applied');
			setData(resData.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	const updateStatus = (id, status) => {
		setActionData({ id, status });
		setOpenAction(true);
	};

	const handleUpdate = async () => {
		const { id, status } = actionData;
		setOpenAdditionLoader(true);
		try {
			await axios.put('staff/bonafide/status', {
				bonafideID: id,
				status
			});
			setOpenAdditionLoader(false);
			setLoadData(old => !old);
			setOpenAction(false);
			setSnack({
				open: true,
				message: `Bonafide ${status} successfully!`,
				type: 'success'
			});
		} catch (error) {
			setOpenAdditionLoader(false);
			setOpenAction(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		getApplied();

		//eslint-disable-next-line
	}, [loadData]);

	return (
		<div>
			<Typography variant='h4' align='center' className={classes.title}>
				New Request
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
								<StyledTableCell>View</StyledTableCell>
								<StyledTableCell>Approve</StyledTableCell>
								<StyledTableCell>Reject</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map(({ studentID: val, _id }, ind) => (
								<StyledTableRow key={ind}>
									<StyledTableCell component='th' scope='row'>
										{val.registerNumber}
									</StyledTableCell>
									<StyledTableCell>{val.name}</StyledTableCell>
									<StyledTableCell>{val.degree}</StyledTableCell>
									<StyledTableCell>{val.department}</StyledTableCell>
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
									<StyledTableCell>
										<IconButton onClick={() => updateStatus(_id, 'approved')}>
											<DoneOutlineOutlinedIcon />
										</IconButton>
									</StyledTableCell>
									<StyledTableCell>
										<IconButton onClick={() => updateStatus(_id, 'rejected')}>
											<CloseOutlinedIcon />
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
					{data.length === 0 && <NotFound description='No new request !' />}
				</TableContainer>
			)}
			<View open={openView} setOpen={setOpenView} data={activeDoc} />
			<Dialog
				title='Confirm'
				description={`Are you sure to ${
					actionData.status === 'approved' ? 'approve' : 'reject'
				} this request?`}
				open={openAction}
				loading={openAdditionLoader}
				handleClose={() => {
					if (!openAdditionLoader) setOpenAction(false);
				}}
				handleConfirm={handleUpdate}
			/>
		</div>
	);
}
