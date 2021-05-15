import { useState } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	Typography,
	IconButton,
	Button,
	Box
} from '@material-ui/core';
import axios from 'axios';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { StyledTableCell, StyledTableRow, NotFound, Dialog } from 'components';
import { useAlStyles } from 'constants/classes';
import AddStudent from './AddStudent';

export default function StudentList({ list, sectionID, setLoadData }) {
	const classes = useAlStyles();
	const [openAdd, setOpenAdd] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [activeDoc, setActiveDoc] = useState({});

	const handleDelete = async () => {
		setButtonLoading(true);
		try {
			await axios.delete('/admin/section/update/student', {
				data: {
					studentId: activeDoc._id,
					id: sectionID
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

	return (
		<div className={classes.table}>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Typography variant='h5' className={classes.title}>
					Students
				</Typography>
				<Button variant='contained' color='secondary' onClick={() => setOpenAdd(true)}>
					Add
				</Button>
			</Box>
			<TableContainer component={Paper} style={{ width: '100%' }} className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>Register No</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Degree</StyledTableCell>
							<StyledTableCell>Department</StyledTableCell>
							<StyledTableCell>Campus</StyledTableCell>
							<StyledTableCell>Remove</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list?.map((val, ind) => {
							return (
								<StyledTableRow key={ind}>
									<StyledTableCell component='th' scope='row'>
										{val.registerNumber}
									</StyledTableCell>
									<StyledTableCell>{val.name}</StyledTableCell>
									<StyledTableCell>{val.degree}</StyledTableCell>
									<StyledTableCell>{val.department}</StyledTableCell>
									<StyledTableCell>{val.campus}</StyledTableCell>
									<StyledTableCell>
										<IconButton
											onClick={() => {
												setActiveDoc(val);
												setOpenDelete(true);
											}}
										>
											<DeleteForeverOutlinedIcon />
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
				{list?.length === 0 && <NotFound />}
			</TableContainer>
			<Dialog
				title='Confirm'
				description='Are you sure to remove this student from section?'
				open={openDelete}
				loading={buttonLoading}
				handleClose={() => {
					if (!buttonLoading) setOpenDelete(false);
				}}
				handleConfirm={handleDelete}
			/>
			<AddStudent
				open={openAdd}
				setOpen={setOpenAdd}
				sectionID={sectionID}
				setLoadData={setLoadData}
			/>
		</div>
	);
}
