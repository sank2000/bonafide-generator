import { format } from 'date-fns';

import { Modal, RowWithTypography } from 'components';
import { Div } from '../Staff/View';

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
						<RowWithTypography title={'Register NO'} value={data.registerNumber} />
						{data.dateOfBirth && (
							<RowWithTypography
								title={'DOB'}
								value={format(new Date(data.dateOfBirth), 'dd - MMM - yyyy')}
							/>
						)}
						<RowWithTypography title={'Department'} value={data.department} />
						<RowWithTypography title={'Gender'} value={data.gender} />
						<RowWithTypography title={'Degree'} value={data.degree} />
						<RowWithTypography title={'Batch'} value={data.batch} />
						<RowWithTypography title={'Campus'} value={data.campus} />
						{data.section?.name && (
							<RowWithTypography title={'Section'} value={data.section?.name} />
						)}
						<RowWithTypography title={'Phone'} value={data.phoneNumber} />
						<RowWithTypography title={'Email'} value={data.email} />
					</tbody>
				</table>
			</div>
		</Modal>
	);
}
