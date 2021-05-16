import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { BgContainer, FlexContainer } from 'components';
import { Link } from 'react-router-dom';

export default function Welcome() {
	const list = [
		{
			image: '/images/admin.png',
			title: 'Admin',
			path: '/admin/login'
		},
		{
			image: '/images/staff.png',
			title: 'Staff',
			path: '/staff/login'
		},
		{
			image: '/images/student.png',
			title: 'Student',
			path: '/student/login'
		}
	];

	return (
		<BgContainer>
			<Typography variant='h3' color='primary' style={{ fontWeight: '600', textAlign: 'center' }}>
				Welcome to Bonafide Generator
			</Typography>
			<BoxContainer>
				{list.map((value, ind) => {
					return (
						<Link key={ind} to={value.path} style={{ textDecoration: 'none' }}>
							<Box>
								<img src={value.image} alt='admin'></img>
								<Typography variant='h5' color='primary'>
									{value.title}
								</Typography>
							</Box>
						</Link>
					);
				})}
			</BoxContainer>
		</BgContainer>
	);
}

const BoxContainer = styled(FlexContainer)`
	margin-top: 4rem;
	flex-wrap: wrap;
`;

const Box = styled(FlexContainer)`
	flex-direction: column;
	min-width: 18rem;
	padding: 1em;
	margin: 1em;
	border-radius: 1em;
	background-color: ${p => p.theme.white};
	cursor: pointer;
	box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
	transition: all 0.3s;

	:hover {
		transform: translateY(-0.5rem);
	}

	h5 {
		font-weight: 600;
		margin-top: 1rem;
	}

	img {
		width: 7rem;
		display: inline-block;
	}
`;
