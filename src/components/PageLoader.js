import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

import logo from 'assets/au_logo';

export default function PageLoader() {
	return (
		<Container>
			<img src={logo} alt='logo'></img>
			<CircularProgress size={120} color='primary' />
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	min-height: 50vh;
	padding: 40px 0;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		position: absolute;
		width: 50px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
