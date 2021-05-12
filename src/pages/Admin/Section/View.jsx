import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { PageLoader } from 'components';
import { adminLayout } from 'constants/classes';
import StaffList from './StaffList';
import StudentList from './StudentList';

const useStyles = makeStyles({
	...adminLayout
});

export default function View({ viewDoc, loadData, setLoadData }) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const getSectionDetails = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get(`/admin/section/${viewDoc?._id}`);
			setData(resData.data);
			setLoading(false);
		} catch (error) {
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		if (!viewDoc) return;
		getSectionDetails();

		//eslint-disable-next-line
	}, [viewDoc, loadData]);

	return viewDoc ? (
		<div style={{ margin: '20px 0' }}>
			{loading ? (
				<PageLoader />
			) : (
				<>
					<Typography variant='h4' align='center' className={classes.title}>
						{data?.name}
					</Typography>
					<StaffList list={data.staffs} sectionID={viewDoc._id} setLoadData={setLoadData} />
					<StudentList list={data.students} sectionID={viewDoc._id} setLoadData={setLoadData} />
				</>
			)}
		</div>
	) : null;
}
