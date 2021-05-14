import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import { rgba } from 'polished';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

import { RowWithTypography, PageLoader } from 'components';
import { adminLayout } from 'constants/classes';
import Edit from './EditProfile';

const useStyles = makeStyles({
	...adminLayout,
	section: {
		...adminLayout.section,
		minHeight: 'calc(100vh - 180px)'
	}
});

export default function Profile() {
	const [openUpdate, setOpenUpdate] = useState(false);
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});

	const getProfile = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/staff/profile');
			setData(resData.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<section className={classes.section}>
			{loading ? (
				<PageLoader />
			) : (
				<Container>
					<div className='imgContainer'>
						<img src={data.profileImg} alt='pro'></img>
					</div>
					<div style={{ overflowX: 'auto' }}>
						<table width='100%'>
							<tbody>
								<RowWithTypography title={'Name'} value={data.name} />
								<RowWithTypography title={'Department'} value={data.department} />
								<RowWithTypography title={'Degree'} value={data.designation} />
								<RowWithTypography title={'Campus'} value={data.campus} />
								{data.section?.name && (
									<RowWithTypography title={'Section'} value={data.section?.name} />
								)}
								<RowWithTypography title={'Phone'} value={data.phoneNumber} />
								<RowWithTypography title={'Email'} value={data.email} />
							</tbody>
						</table>
					</div>
				</Container>
			)}
			<Edit open={openUpdate} setOpen={setOpenUpdate} data={data} setData={setData} />
			<Fab color='secondary' className={classes.float} onClick={() => setOpenUpdate(true)}>
				<EditIcon />
			</Fab>
		</section>
	);
}

const Container = styled.div`
	border: ${p => `3px solid ${rgba(p.theme.primary, 0.5)}`};
	padding: 20px;
	padding-top: 50px;
	width: 90%;
	max-width: 1200px;
	margin: 100px auto 20px;
	position: relative;

	.imgContainer {
		width: 100px;
		height: 100px;
		overflow: hidden;
		border-radius: 50%;
		background-color: #fff;
		border: ${p => `3px solid ${rgba(p.theme.primary, 0.5)}`};
		position: absolute;
		top: -15%;
		left: 50%;
		transform: translateX(-50%);
	}

	img {
		width: 100%;
		object-fit: cover;
		object-position: center;
	}
`;
