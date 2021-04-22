import { useState } from 'react';
import styled from 'styled-components';
import { Typography, TextField, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { BgContainer, FlexContainer } from 'components';

export default function StudentLogin() {
	const [selectedDate, handleDateChange] = useState(new Date());
	const [registerNo, setRegisterNo] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if (selectedDate.toDateString() === 'Invalid Date') return;
		console.log({ registerNo, dob: selectedDate.toISOString() });
	};

	return (
		<BgContainer>
			<Box>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<img src='/images/student.png' alt='student'></img>
					<Typography variant='h5' color='primary' style={{ fontWeight: '600' }}>
						LOGIN
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label='Register no'
							required
							value={registerNo}
							onChange={e => setRegisterNo(e.target.value)}
						/>
						<KeyboardDatePicker
							label='DOB'
							required
							format='dd - MM - yyyy'
							inputVariant='outlined'
							value={selectedDate}
							onChange={handleDateChange}
						/>
						<Button variant='contained' color='primary' type='submit'>
							LOGIN
						</Button>
					</form>
				</MuiPickersUtilsProvider>
			</Box>
		</BgContainer>
	);
}

const Box = styled(FlexContainer)`
	flex-direction: column;
	min-width: 35rem;
	padding: 2em;
	border-radius: 1em;
	background-color: ${p => p.theme.white};
	cursor: pointer;
	box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);

	@media only screen and (max-width: 600px) {
		min-width: auto;
		width: 94%;
	}

	form {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	img {
		width: 4rem;
		display: inline-block;
	}

	h5 {
		margin: 1rem 0;
	}

	button {
		margin: 1rem 0;
	}
`;
