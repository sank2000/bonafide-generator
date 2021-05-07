import { useState } from 'react';
import { Typography, Button, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { rgba } from 'polished';

import { FlexContainer } from 'components';

export default function Bonafide() {
	const [step] = useState(3);

	return (
		<section>
			<ApplyContainer>
				<Typography variant='h4'>You are not applied for bonafide recently.</Typography>
				<Button variant='contained' color='primary' size='large'>
					Apply Now
				</Button>
			</ApplyContainer>
			<StatsContainer>
				<Typography variant='h4'>Application Status</Typography>
				<Stats>
					<Line />
					<Line2 step={step} />
					<Tooltip title='Applied' placement='bottom' arrow>
						<Stat active={step >= 1}>
							<TouchAppOutlinedIcon style={{ fontSize: 40 }} />
						</Stat>
					</Tooltip>
					<Tooltip title='Verified' placement='bottom' arrow>
						<Stat active={step >= 2}>
							<ThumbUpAltOutlinedIcon style={{ fontSize: 40 }} />
						</Stat>
					</Tooltip>
					<Tooltip title='Downloadable' placement='bottom' arrow>
						<Stat active={step >= 3}>
							<DoneOutlineOutlinedIcon style={{ fontSize: 40 }} />
						</Stat>
					</Tooltip>
				</Stats>
				<Button variant='contained' color='primary' size='large'>
					Download
				</Button>
			</StatsContainer>
			<PdfContainer>
				<object
					width='100%'
					height='1000'
					data='http://www.africau.edu/images/default/sample.pdf'
					type='application/pdf'
				>
					{' '}
				</object>
			</PdfContainer>
		</section>
	);
}

const ApplyContainer = styled(FlexContainer)`
	flex-direction: column;
	padding: 10px;
	margin-top: 20px;

	button {
		margin-top: 20px;
	}
`;

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
	background-color: #fff;
	padding: 10px;
	border-radius: 50%;
	cursor: pointer;
	border: ${p =>
		p.active ? `3px solid ${p.theme.primary}` : `3px solid ${rgba(p.theme.primary, 0.2)}`};
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

const PdfContainer = styled.div`
	margin: 0 auto;
	width: 90%;
	max-width: 1200px;
`;
