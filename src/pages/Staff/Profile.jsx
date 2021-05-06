import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { rgba } from 'polished';

export default function Profile() {
	return (
		<Container>
			<div className='imgContainer'>
				<img src='/images/staff.png' alt='pro'></img>
			</div>
			<div style={{ overflowX: 'auto' }}>
				<table width='100%'>
					<tbody>
						<Row title={'Name'} value={'Staff 1'} />
						<Row title={'ID'} value={'123456'} />
						<Row title={'Designation'} value={'Assistant Professor'} />
						<Row title={'Department'} value={'CSE'} />
						<Row title={'Campus'} value={'BIT'} />
						<Row title={'Phone'} value={'1234567890'} />
						<Row title={'Email'} value={'staff@gmail.com'} />
					</tbody>
				</table>
			</div>
		</Container>
	);
}

function Row({ title, value }) {
	return (
		<tr>
			<td style={{ width: '40%' }}>
				<Typography variant='h6'>{title}</Typography>
			</td>
			<td>:</td>
			<td>
				<Typography variant='h6'>{value}</Typography>
			</td>
		</tr>
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
