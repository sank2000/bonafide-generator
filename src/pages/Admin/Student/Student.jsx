import { useState } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { StyledTableCell, StyledTableRow, Dialog } from 'components';
import { adminLayout } from 'constants/classes';
import Add from './Add';
import Edit from './Edit';
import View from './View';

const useStyles = makeStyles({
	...adminLayout
});

export default function Student() {
	const classes = useStyles();
	const [openAdd, setOpenAdd] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
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
							<StyledTableCell>Register No</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Degree</StyledTableCell>
							<StyledTableCell>Department</StyledTableCell>
							<StyledTableCell>Campus</StyledTableCell>
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
										{val.registerNo}
									</StyledTableCell>
									<StyledTableCell>{val.degree}</StyledTableCell>
									<StyledTableCell>{val.name}</StyledTableCell>
									<StyledTableCell>{val.department}</StyledTableCell>
									<StyledTableCell>{val.campus}</StyledTableCell>
									<StyledTableCell>
										<IconButton onClick={() => setOpenView(true)}>
											<VisibilityOutlinedIcon />
										</IconButton>
									</StyledTableCell>
									<StyledTableCell>
										<IconButton onClick={() => setOpenUpdate(true)}>
											<EditOutlinedIcon />
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
			<View open={openView} setOpen={setOpenView} />
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
