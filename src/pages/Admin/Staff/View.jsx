import { Button, Box } from '@material-ui/core';

import { Modal, RowWithTypography } from 'components';

export default function View({ open, setOpen }) {
	return (
		<Modal title={'View'} open={open} setOpen={setOpen}>
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
			<Box display='flex' justifyContent='flex-end'>
				<Button variant='contained' color='primary' type='button' onClick={() => setOpen(false)}>
					close
				</Button>
			</Box>
		</Modal>
	);
}
