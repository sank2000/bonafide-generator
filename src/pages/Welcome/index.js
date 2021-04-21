import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export default function Welcome() {
	return (
		<Container>
			<Typography variant='h3' color='primary' style={{ fontWeight: '600' }}>
				Welcome to Bonafide Generator
			</Typography>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: ${p =>
		`linear-gradient(${p.theme.grey}CC,${p.theme.grey}CC),url('/images/hero.jpg')`};
	background-size: cover;
	background-position: center;
`;
