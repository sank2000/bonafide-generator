import { useState, useEffect, useContext } from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import { format } from 'date-fns';

import Snack from 'contexts/Snack';
import { FlexContainer, PageLoader } from 'components';
import PdfDocument from './PdfDocument';
import Stats from './Stats';
import ReRequest from './ReRequest';

export default function Bonafide() {
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [rejected, setRejected] = useState(false);
	const [loadingApply, setLoadingApply] = useState(false);
	const { setSnack } = useContext(Snack);
	const [bonafide, setBonafideData] = useState(null);
	const [data, setData] = useState({});

	const getDetails = async () => {
		setLoading(true);
		try {
			const { data: resData } = await axios.get('/student/bonafide/status');
			setBonafideData(resData.data);
			if (resData.data) {
				if (resData.data.status === 'approved') {
					setData(resData.data.studentID);
					setStep(3);
				} else if (resData.data.status === 'rejected') {
					setRejected(true);
				}
			}
			setLoading(false);
		} catch (error) {
			setLoading(true);
			error.handleGlobally && error.handleGlobally();
		}
	};

	const applyBonafide = async () => {
		if (loadingApply) return;
		setLoadingApply(true);
		try {
			const { data: resData } = await axios.get('/student/bonafide/apply');
			setBonafideData(resData.data);
			setLoadingApply(false);
			setSnack({
				open: true,
				message: 'Bonafide applied successfully!',
				type: 'success'
			});
		} catch (error) {
			setLoadingApply(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	useEffect(() => {
		getDetails();
	}, []);

	return (
		<section>
			{!loading && (
				<>
					{!bonafide ? (
						<ApplyContainer>
							<Typography variant='h4'>You are not applied for bonafide recently.</Typography>
							<Button variant='contained' color='primary' size='large' onClick={applyBonafide}>
								Apply Now
							</Button>
						</ApplyContainer>
					) : (
						<Container>
							<Stats step={step} rejected={rejected} />
							{step === 1 && bonafide?.createdAt && (
								<Typography variant='h6'>
									Applied on {format(new Date(bonafide.createdAt), 'do MMM,yyyy')}
								</Typography>
							)}
							{rejected && (
								<ReRequest
									bonafide={bonafide}
									setBonafideData={setBonafideData}
									setRejected={setRejected}
								/>
							)}
							{step === 3 && (
								<PDFDownloadLink
									document={<PdfDocument data={data} />}
									fileName='bonafide.pdf'
									style={buttonStyle}
								>
									{({ blob, url, loading, error }) => {
										return loading ? 'Loading document...' : 'Download Pdf';
									}}
								</PDFDownloadLink>
							)}
							{step === 3 && !(window.orientation > -1) && (
								<PdfContainer>
									<PDFViewer style={{ width: '100%', height: '600px' }}>
										<PdfDocument data={data} />
									</PDFViewer>
								</PdfContainer>
							)}
						</Container>
					)}
				</>
			)}
			{(loading || loadingApply) && <PageLoader />}
		</section>
	);
}

const buttonStyle = {
	fontFamily: 'Poppins',
	textTransform: 'uppercase',
	fontWeight: 500,
	color: '#fff',
	backgroundColor: '#a61d22',
	textDecoration: 'none',
	padding: '8px 22px',
	borderRadius: '4px',
	margin: '30px 0',
	boxShadow:
		'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
};

const ApplyContainer = styled(FlexContainer)`
	flex-direction: column;
	padding: 10px;
	margin-top: 20px;

	button {
		margin-top: 20px;
	}
`;
const Container = styled(FlexContainer)`
	flex-direction: column;
`;

const PdfContainer = styled.div`
	margin: 0 auto;
	width: 90%;
	max-width: 1200px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
