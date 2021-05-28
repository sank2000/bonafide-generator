import { useState, useEffect } from 'react';
import {
	Typography,
	Fab,
	IconButton,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody
} from '@material-ui/core';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { StyledTableCell, StyledTableRow, Dialog, PageLoader, NotFound } from 'components';
import { useAlStyles } from 'constants/classes';
import Add from './Add';

export default function Admin() {
	const classes = useAlStyles();
	const [openAdd, setOpenAdd] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [activeDoc, setActiveDoc] = useState({});
	const [loading, setLoading] = useState(false);
	const [loadData, setLoadData] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [data, setData] = useState([]);

	const getAdmin = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/admin/all');
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
			await axios.delete('/admin/delete', {
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
		getAdmin();
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
								<StyledTableCell>ID</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Phone</StyledTableCell>
								<StyledTableCell>Delete</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((val, ind) => {
								return (
									<StyledTableRow key={ind}>
										<StyledTableCell component='th' scope='row'>
											{ind + 1}
										</StyledTableCell>
										<StyledTableCell>{val.name}</StyledTableCell>
										<StyledTableCell>{val.email}</StyledTableCell>
										<StyledTableCell>{val.phoneNumber}</StyledTableCell>
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
					{data.length === 0 && <NotFound description='No admin found !' />}
				</TableContainer>
			)}
			{loading && <PageLoader />}
			<Add open={openAdd} setOpen={setOpenAdd} setLoadData={setLoadData} />
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
