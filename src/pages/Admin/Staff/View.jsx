import { Button, Box } from '@material-ui/core';
import styled from 'styled-components';

import { Modal, RowWithTypography } from 'components';

export default function View({ open, setOpen, data }) {
	return (
		<Modal title={'View'} open={open} setOpen={setOpen}>
			<Div>
				<div className='imgContainer'>
					<img src={data.profileImg ?? '/images/staff.png'} alt='pro'></img>
				</div>
			</Div>
			<div style={{ overflowX: 'auto' }}>
				<table width='100%'>
					<tbody>
						<RowWithTypography title={'Name'} value={data.name} />
						<RowWithTypography title={'Designation'} value={data.designation} />
						<RowWithTypography title={'Department'} value={data.department} />
						<RowWithTypography title={'Campus'} value={data.campus} />
						<RowWithTypography title={'Phone'} value={data.phoneNumber} />
						<RowWithTypography title={'Email'} value={data.email} />
					</tbody>
				</table>
			</div>
			<Box display='flex' justifyContent='flex-end'>
				<Button variant='contained' color='primary' type='button' onClick={() => setOpen(false)}>
					close
				</Button>
			</Box>
		</Modal>
	);
}

const Div = styled.div`
	text-align: center;
	display: flex;
	justify-content: center;
	margin-bottom: 15px;

	.imgContainer {
		width: 100px;
		height: 100px;
		overflow: hidden;
		border-radius: 50%;
		background-color: #fff;
		border: 3px solid grey;
	}

	img {
		width: 100%;
		object-fit: cover;
		object-position: center;
	}
`;
