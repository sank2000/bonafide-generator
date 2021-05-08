import { Button, Box } from '@material-ui/core';

import { Modal, RowWithTypography } from 'components';

export default function View({ open, setOpen }) {
	return (
		<Modal title={'View'} open={open} setOpen={setOpen}>
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
			<Box display='flex' justifyContent='flex-end'>
				<Button variant='contained' color='primary' type='button' onClick={() => setOpen(false)}>
					close
				</Button>
			</Box>
		</Modal>
	);
}
