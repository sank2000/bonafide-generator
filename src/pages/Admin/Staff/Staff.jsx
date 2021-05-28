import { useState, useEffect } from 'react';
import { Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	IconButton
} from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import axios from 'axios';

import { StyledTableCell, StyledTableRow, Dialog, PageLoader, NotFound } from 'components';
import { useAlStyles } from 'constants/classes';
import Add from './Add';
import Edit from './Edit';
import View from './View';

export default function Staff() {
	const classes = useAlStyles();
	const [openAdd, setOpenAdd] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [loadData, setLoadData] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [activeDoc, setActiveDoc] = useState({});
	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [data, setData] = useState([]);

	const getStaff = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/admin/staff/all');
			setData(resData.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	const handleSetActive = (state, value) => {
		setActiveDoc(value);
		state(true);
	};

	const handleDelete = async () => {
		setButtonLoading(true);
		try {
			await axios.delete('/admin/staff/delete', {
				data: {
					id: activeDoc._id
				}
			});
			setButtonLoading(false);
			setLoadData(old => !old);
		} catch (error) {
			setButtonLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
		setOpenDelete(false);
	};

	useEffect(() => {
		getStaff();
	}, [loadData]);

	return (
		<section className={classes.section}>
			<Typography variant='h4' align='center' className={classes.title}>
				List
			</Typography>
			{!loading && (
				<TableContainer component={Paper} className={classes.table}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Designation</StyledTableCell>
								<StyledTableCell>Department</StyledTableCell>
								<StyledTableCell>Campus</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>View</StyledTableCell>
								<StyledTableCell>Edit</StyledTableCell>
								<StyledTableCell>Delete</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((val, ind) => {
								return (
									<StyledTableRow key={ind}>
										<StyledTableCell component='th' scope='row'>
											{val.name}
										</StyledTableCell>
										<StyledTableCell>{val.designation}</StyledTableCell>
										<StyledTableCell>{val.department}</StyledTableCell>
										<StyledTableCell>{val.campus}</StyledTableCell>
										<StyledTableCell>{val.email}</StyledTableCell>
										<StyledTableCell>
											<IconButton onClick={() => handleSetActive(setOpenView, val)}>
												<VisibilityOutlinedIcon />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<IconButton onClick={() => handleSetActive(setOpenUpdate, val)}>
												<EditOutlinedIcon />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<IconButton onClick={() => handleSetActive(setOpenDelete, val)}>
												<DeleteForeverOutlinedIcon />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
								);
							})}
						</TableBody>
					</Table>
					{data.length === 0 && <NotFound description='No Staff Found!' />}
				</TableContainer>
			)}
			{loading && <PageLoader />}
			<Add open={openAdd} setOpen={setOpenAdd} setLoadData={setLoadData} />
			<Edit
				open={openUpdate}
				setOpen={setOpenUpdate}
				setLoadData={setLoadData}
				activeData={activeDoc}
			/>
			<View open={openView} setOpen={setOpenView} setLoadData={setLoadData} data={activeDoc} />
			<Dialog
				title='Confirm'
				description='Are you sure to delete this?'
				open={openDelete}
				loading={buttonLoading}
				handleClose={() => {
					if (!buttonLoading) setOpenDelete(false);
				}}
				handleConfirm={handleDelete}
			/>
			<Fab color='secondary' className={classes.float} onClick={() => setOpenAdd(true)}>
				<AddIcon />
			</Fab>
		</section>
	);
}
