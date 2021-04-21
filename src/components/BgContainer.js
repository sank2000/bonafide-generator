import styled from 'styled-components';

import FlexContainer from './FlexContainer';

export default styled(FlexContainer)`
	min-height: 100vh;
	padding: 2rem;
	flex-direction: column;
	background-image: ${p =>
		`linear-gradient(${p.theme.grey}CC,${p.theme.grey}CC),url('/images/hero.jpg')`};
	background-size: cover;
	background-position: center;
`;
