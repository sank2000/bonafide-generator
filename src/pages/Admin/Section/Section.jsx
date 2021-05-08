import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import { StyledTableCell, StyledTableRow } from 'components';
import { adminLayout } from 'constants/classes';
import Add from './Add';
import AddStudent from './AddStudent';
import Edit from './Edit';
import View from './View';

const useStyles = makeStyles({
	...adminLayout
});

export default function Staff() {
	const classes = useStyles();
	const [openAdd, setOpenAdd] = useState(false);
	const [openAddStudent, setOpenAddStudent] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openView, setOpenView] = useState(false);
	const data = [
		{
			name: 'Section 1',
			staff: 'Staff 1',
			noOfStudents: 10
		},
		{
			name: 'Section 2',
			staff: 'Staff 2',
			noOfStudents: 15
		},
		{
			name: 'Section 3',
			staff: 'Staff 3',
			noOfStudents: 17
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
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Staff</StyledTableCell>
							<StyledTableCell>No of students</StyledTableCell>
							<StyledTableCell>Add student</StyledTableCell>
							<StyledTableCell>View</StyledTableCell>
							<StyledTableCell>Edit</StyledTableCell>
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
									<StyledTableCell>{val.staff}</StyledTableCell>
									<StyledTableCell>{val.noOfStudents}</StyledTableCell>
									<StyledTableCell>
										<IconButton onClick={() => setOpenAddStudent(true)}>
											<AddOutlinedIcon />
										</IconButton>
									</StyledTableCell>
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
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Add open={openAdd} setOpen={setOpenAdd} />
			<AddStudent open={openAddStudent} setOpen={setOpenAddStudent} />
			<Edit open={openUpdate} setOpen={setOpenUpdate} />
			<View open={openView} setOpen={setOpenView} />
			<Fab color='secondary' className={classes.float} onClick={() => setOpenAdd(true)}>
				<AddIcon />
			</Fab>
		</section>
	);
}
