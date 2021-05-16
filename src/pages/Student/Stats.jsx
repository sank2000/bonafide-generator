import { Typography, Tooltip } from '@material-ui/core';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { rgba } from 'polished';
import styled from 'styled-components';

import { FlexContainer } from 'components';

export default function StatsComponent({ step, rejected }) {
	return (
		<StatsContainer>
			<Typography variant='h4'>Application Status</Typography>
			<Stats>
				<Line />
				<Line2 step={step} />
				<Tooltip title='Applied' placement='bottom' arrow>
					<Stat active={step >= 1}>
						<TouchAppOutlinedIcon style={{ fontSize: 40, color: step >= 1 ? 'white' : 'black' }} />
					</Stat>
				</Tooltip>
				<Tooltip title='Verified' placement='bottom' arrow>
					<Stat active={step >= 2} rejected={rejected}>
						<ThumbUpAltOutlinedIcon
							style={{ fontSize: 40, color: step >= 2 ? 'white' : rejected ? 'grey' : 'black' }}
						/>
					</Stat>
				</Tooltip>
				<Tooltip title='Downloadable' placement='bottom' arrow>
					<Stat active={step >= 3} rejected={rejected}>
						<DoneOutlineOutlinedIcon
							style={{ fontSize: 40, color: step >= 3 ? 'white' : rejected ? 'grey' : 'black' }}
						/>
					</Stat>
				</Tooltip>
			</Stats>
		</StatsContainer>
	);
}

const StatsContainer = styled.div`
	margin: 100px auto 20px;
	width: 90%;
	max-width: 1200px;
	text-align: center;
`;
const Stats = styled(FlexContainer)`
	justify-content: space-between;
	margin: 40px 0;
	position: relative;
`;
const Stat = styled.div`
	background-color: ${p => (p.active ? p.theme.primary : '#fff')};
	padding: 10px;
	border-radius: 50%;
	cursor: pointer;
	position: relative;
	border: ${p =>
		p.active ? `3px solid ${p.theme.primary}` : `3px solid ${rgba(p.theme.primary, 0.2)}`};

	&::before,
	&::after {
		content: '';
		display: ${p => (p.rejected ? 'inline-block' : 'none')};
		width: 100%;
		height: 5px;
		background-color: ${p => p.theme.primary};
		position: absolute;
		top: 50%;
		left: 50%;
	}

	&::before {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	&::after {
		transform: translate(-50%, -50%) rotate(135deg);
	}
`;

const Line = styled.div`
	width: 100%;
	height: 5px;
	background-color: ${p => rgba(p.theme.primary, 0.2)};
	position: absolute;
	z-index: -1;
`;
const Line2 = styled(Line)`
	width: ${p => (p.step === 3 ? '100%' : p.step === 2 ? '50%' : '0%')};
	background-color: ${p => p.theme.primary};
`;
