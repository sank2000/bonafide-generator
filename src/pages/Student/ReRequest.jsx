import { useState, useContext } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';

import { FlexContainer, ButtonWithLoader } from 'components';
import Snack from 'contexts/Snack';

export default function ReRequest({ bonafide, setBonafideData, setRejected }) {
	const [loading, setLoading] = useState(false);
	const { setSnack } = useContext(Snack);

	const applyBonafide = async () => {
		if (loading) return;
		setLoading(true);
		try {
			const { data: resData } = await axios.put('/student/bonafide/review', {
				bonafideID: bonafide._id
			});
			setLoading(false);
			setBonafideData(resData.data);
			setRejected(false);
			setSnack({
				open: true,
				message: 'Bonafide re-request successfully!',
				type: 'success'
			});
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
	};

	return (
		<Container>
			<Typography variant='h6' style={{ marginBottom: '30px' }}>
				Your Bonafide application was rejected
			</Typography>
			<ButtonWithLoader
				text='Re-request Review'
				loading={loading}
				size='large'
				onClick={applyBonafide}
			/>
		</Container>
	);
}

const Container = styled(FlexContainer)`
	flex-direction: column;
	padding: 30px 0;
`;
