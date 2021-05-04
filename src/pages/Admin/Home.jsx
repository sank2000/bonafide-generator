import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { rgba } from 'polished';

import { FlexContainer } from 'components';
import { useHistory } from 'react-router';

export default function Home() {
	const [loadCount, setLoadCount] = useState(true);
	const [random, setRandom] = useState(0);
	const history = useHistory();

	useEffect(() => {
		const timer = setInterval(() => {
			setRandom(Math.floor(Math.random() * Math.floor(100)));
		});

		setTimeout(() => {
			setLoadCount(false);
		}, [3000]);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const data = [
		{
			title: 'Staffs',
			image: '/images/staff.png',
			path: '/staff',
			count: 10
		},
		{
			title: 'Students',
			image: '/images/student.png',
			path: '/student',
			count: 69
		},
		{
			title: 'Sections',
			image: '/images/section.png',
			path: '/section',
			count: 2
		},
		{
			title: 'Admin',
			image: '/images/admin.png',
			path: '/admin',
			count: 3
		}
	];

	return (
		<section>
			<Container>
				{data.map((val, ind) => {
					return (
						<BoxContainer key={ind} onClick={() => history.push(val.path)}>
							<div>
								<Typography variant='h3' color='primary'>
									{val.title}
								</Typography>
								<Typography variant='h2' style={{ fontWeight: '600' }} color='primary'>
									{loadCount ? random + val.count : val.count}
								</Typography>
							</div>
							<img src={val.image} alt='admin'></img>
						</BoxContainer>
					);
				})}
			</Container>
		</section>
	);
}

const Container = styled(FlexContainer)`
	margin-top: 30px;
	flex-wrap: wrap;
`;

const BoxContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 90%;
	max-width: 450px;
	margin: 20px;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	transition: background-color 0.2s;
	cursor: pointer;

	img {
		margin: 20px;
		width: 150px;
	}

	&:hover {
		background-color: ${p => rgba(p.theme.primary, 0.6)};

		h3,
		h2 {
			color: ${p => p.theme.white} !important;
		}
	}

	@media (max-width: 700px) {
		flex-basis: 100%;

		&:not(:last-child) {
			margin-bottom: 2rem;
		}
	}
`;
