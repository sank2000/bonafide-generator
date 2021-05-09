import { useState } from 'react';
import { Typography, Button, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { rgba } from 'polished';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import { FlexContainer } from 'components';
import PdfDocument from './PdfDocument';

const buttonStyle = {
	fontFamily: 'Poppins',
	textTransform: 'uppercase',
	fontWeight: 500,
	color: '#fff',
	backgroundColor: '#a61d22',
	textDecoration: 'none',
	padding: '8px 22px',
	borderRadius: '4px',
	boxShadow:
		'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
};

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
				<PDFDownloadLink document={<PdfDocument />} fileName='bonafide.pdf' style={buttonStyle}>
					{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Pdf')}
				</PDFDownloadLink>
			</StatsContainer>
			<PdfContainer>
				<PDFViewer style={{ width: '100%', height: '600px' }}>
					<PdfDocument />
				</PDFViewer>
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
	display: flex;
	justify-content: center;
	align-items: center;
`;
