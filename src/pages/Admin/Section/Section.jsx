import { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	Typography,
	Fab,
	IconButton
} from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import axios from 'axios';

import { StyledTableCell, StyledTableRow, PageLoader, NotFound } from 'components';
import { useAlStyles } from 'constants/classes';
import Add from './Add';
import Edit from './Edit';
import View from './View';

export default function Section() {
	const classes = useAlStyles();
	const [openAdd, setOpenAdd] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [viewDoc, setViewDoc] = useState(null);
	const [activeDoc, setActiveDoc] = useState({});
	const [loadData, setLoadData] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const getSection = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/admin/section/all');
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

	useEffect(() => {
		getSection();
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
								<StyledTableCell>S.no</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>No of staffs</StyledTableCell>
								<StyledTableCell>No of students</StyledTableCell>
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
										<StyledTableCell>{val.staffs?.length}</StyledTableCell>
										<StyledTableCell>{val.students?.length}</StyledTableCell>
										<StyledTableCell>
											<IconButton onClick={() => setViewDoc(val)}>
												<VisibilityOutlinedIcon />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<IconButton onClick={() => handleSetActive(setOpenUpdate, val)}>
												<EditOutlinedIcon />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
								);
							})}
						</TableBody>
					</Table>
					{data.length === 0 && <NotFound description='No section found !' />}
				</TableContainer>
			)}
			{loading && <PageLoader />}
			<Add open={openAdd} setOpen={setOpenAdd} setLoadData={setLoadData} />
			<Edit
				open={openUpdate}
				setOpen={setOpenUpdate}
				activeDoc={activeDoc}
				setLoadData={setLoadData}
			/>
			<View viewDoc={viewDoc} activeDoc={activeDoc} setLoadData={setLoadData} loadData={loadData} />
			<Fab color='secondary' className={classes.float} onClick={() => setOpenAdd(true)}>
				<AddIcon />
			</Fab>
		</section>
	);
}
