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
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { StyledTableCell, StyledTableRow, NotFound } from 'components';
import { adminLayout } from 'constants/classes';
import AddStaff from './AddStaff';

const useStyles = makeStyles({
	...adminLayout
});

export default function StaffList({ list, sectionID, setLoadData }) {
	const classes = useStyles();
	const [openAdd, setOpenAdd] = useState(false);

	return (
		<div className={classes.table}>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Typography variant='h5' className={classes.title}>
					Staffs
				</Typography>
				<Button variant='contained' color='secondary' onClick={() => setOpenAdd(true)}>
					Add
				</Button>
			</Box>
			<TableContainer component={Paper} style={{ width: '100%' }} className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Designation</StyledTableCell>
							<StyledTableCell>Department</StyledTableCell>
							<StyledTableCell>Campus</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Remove</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list?.map((val, ind) => {
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
										<IconButton onClick={null}>
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
			<AddStaff
				open={openAdd}
				setOpen={setOpenAdd}
				sectionID={sectionID}
				setLoadData={setLoadData}
			/>
		</div>
	);
}
