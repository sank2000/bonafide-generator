import { useState } from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { StyledTableCell, StyledTableRow, Dialog } from 'components';
import { useAlStyles } from 'constants/classes';
import Add from './Add';
import Edit from './Edit';

export default function Admin() {
	const classes = useAlStyles();
	const [openAdd, setOpenAdd] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const data = [
		{
			name: 'Admin 1',
			phone: 9876543210,
			email: 'admin1@gmail.com'
		},
		{
			name: 'Admin 2',
			phone: 9876543210,
			email: 'admin2@gmail.com'
		},
		{
			name: 'Admin 3',
			phone: 9876543210,
			email: 'admin3@gmail.com'
		}
	];

	const handleDelete = () => {
		setOpenDelete(false);
	};

	const handleOpenDelete = id => {
		setOpenDelete(true);
	};
	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	return (
		<section className={classes.section}>
			<Typography variant='h4' align='center' className={classes.title}>
				List
			</Typography>
			<TableContainer component={Paper} className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Phone</StyledTableCell>
							<StyledTableCell>Edit</StyledTableCell>
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
									<StyledTableCell>{val.phone}</StyledTableCell>
									<StyledTableCell>
										<IconButton>
											<EditOutlinedIcon onClick={() => setOpenUpdate(true)} />
										</IconButton>
									</StyledTableCell>
									<StyledTableCell>
										<IconButton onClick={() => handleOpenDelete(ind + 1)}>
											<DeleteForeverOutlinedIcon />
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Add open={openAdd} setOpen={setOpenAdd} />
			<Edit open={openUpdate} setOpen={setOpenUpdate} />
			<Dialog
				title='Conform'
				description='Are you sure to delete this?'
				open={openDelete}
				handleClose={handleCloseDelete}
				handleConform={handleDelete}
			/>
			<Fab color='secondary' className={classes.float} onClick={() => setOpenAdd(true)}>
				<AddIcon />
			</Fab>
		</section>
	);
}
