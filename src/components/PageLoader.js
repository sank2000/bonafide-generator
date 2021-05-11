import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

export default function PageLoader() {
	return (
		<Container>
			<img src='/images/au_logo.png' alt='logo'></img>
			<CircularProgress size={120} color='primary' />
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	text-align: center;

	img {
		position: absolute;
		width: 50px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
