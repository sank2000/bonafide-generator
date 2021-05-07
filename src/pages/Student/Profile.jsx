import styled from 'styled-components';
import { rgba } from 'polished';

import { RowWithTypography } from 'components';

export default function Profile() {
	return (
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
