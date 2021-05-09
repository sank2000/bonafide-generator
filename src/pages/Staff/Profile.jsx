import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import { rgba } from 'polished';
import EditIcon from '@material-ui/icons/Edit';

import { RowWithTypography } from 'components';
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

	return (
		<section className={classes.section}>
			<Container>
				<div className='imgContainer'>
					<img src='/images/staff.png' alt='pro'></img>
				</div>
				<div style={{ overflowX: 'auto' }}>
					<table width='100%'>
						<tbody>
							<RowWithTypography title={'Name'} value={'Staff 1'} />
							<RowWithTypography title={'ID'} value={'123456'} />
							<RowWithTypography title={'Designation'} value={'Assistant Professor'} />
							<RowWithTypography title={'Department'} value={'CSE'} />
							<RowWithTypography title={'Campus'} value={'BIT'} />
							<RowWithTypography title={'Phone'} value={'1234567890'} />
							<RowWithTypography title={'Email'} value={'staff@gmail.com'} />
						</tbody>
					</table>
				</div>
			</Container>
			<Edit open={openUpdate} setOpen={setOpenUpdate} />
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
		top: -20%;
		left: 50%;
		transform: translateX(-50%);
	}

	img {
		width: 100%;
		object-fit: cover;
		object-position: center;
	}
`;
