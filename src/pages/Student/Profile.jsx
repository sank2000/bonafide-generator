import { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { rgba } from 'polished';
import EditIcon from '@material-ui/icons/Edit';
import { Fab } from '@material-ui/core';

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
					<img src='/images/student.png' alt='pro'></img>
				</div>
				<div style={{ overflowX: 'auto' }}>
					<table width='100%'>
						<tbody>
							<RowWithTypography title={'Name'} value={'Student 1'} />
							<RowWithTypography title={'Register NO'} value={'810018104080'} />
							<RowWithTypography title={'DOB'} value={'08 - 11 - 2000'} />
							<RowWithTypography title={'Department'} value={'CSE'} />
							<RowWithTypography title={'Degree'} value={'BE'} />
							<RowWithTypography title={'Batch'} value={'2018 - 2023'} />
							<RowWithTypography title={'Campus'} value={'BIT'} />
							<RowWithTypography title={'Section ID'} value={'12'} />
							<RowWithTypography title={'Phone'} value={'1234567890'} />
							<RowWithTypography title={'Email'} value={'student@gmail.com'} />
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
