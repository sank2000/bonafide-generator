import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	Typography
} from '@material-ui/core';
import { format } from 'date-fns';

import {
	StyledTableCell,
	StyledTableRow,
	PageLoader,
	RowWithTypography,
	NotFound
} from 'components';
import { useAlStyles } from 'constants/classes';

export default function Student() {
	const classes = useAlStyles();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const getStudents = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/staff/section/student');
			setData(resData.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			error.handleGlobally ?? error.handleGlobally();
		}
	};

	useEffect(() => {
		getStudents();
	}, []);

	return (
		<section className={classes.section}>
			<Typography variant='h4' align='center' className={classes.title}>
				{data[0]?.section?.name}
			</Typography>
			<div className={classes.table}>
				<table width='100%' style={{ overflowX: 'auto', margin: '20px 0' }}>
					<tbody>
						{data[0]?.department && (
							<RowWithTypography title={'Department'} value={data[0]?.department} />
						)}
						{data[0]?.degree && <RowWithTypography title={'Degree'} value={data[0]?.degree} />}
						{data[0]?.campus && <RowWithTypography title={'Campus'} value={data[0]?.campus} />}
						{data[0]?.batch && <RowWithTypography title={'Batch'} value={data[0]?.batch} />}
					</tbody>
				</table>
			</div>
			{loading ? (
				<PageLoader />
			) : (
				<TableContainer component={Paper} className={classes.table}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>Register No</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>DOB</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Phone</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((val, ind) => {
								return (
									<StyledTableRow key={ind}>
										<StyledTableCell component='th' scope='row'>
											{val.registerNumber}
										</StyledTableCell>
										<StyledTableCell>{val.name}</StyledTableCell>
										{val.dateOfBirth && (
											<StyledTableCell style={{ whiteSpace: 'nowrap' }}>
												{format(new Date(val.dateOfBirth), 'dd - MMM - yyyy')}
											</StyledTableCell>
										)}
										<StyledTableCell>{val.email}</StyledTableCell>
										<StyledTableCell>{val.phoneNumber}</StyledTableCell>
									</StyledTableRow>
								);
							})}
						</TableBody>
					</Table>
					{data.length === 0 && <NotFound description='No students found !' />}
				</TableContainer>
			)}
		</section>
	);
}
