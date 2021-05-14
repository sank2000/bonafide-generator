import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { StyledTableCell, StyledTableRow, PageLoader } from 'components';
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
			console.log(resData.data);
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
				{data[0].section.name}
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
								<StyledTableCell>Campus</StyledTableCell>
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
										<StyledTableCell>{val.degree}</StyledTableCell>
										<StyledTableCell>{val.department}</StyledTableCell>
										<StyledTableCell>{val.campus}</StyledTableCell>
									</StyledTableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</section>
	);
}
