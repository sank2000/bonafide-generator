import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Typography, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import axios from 'axios';

import { BgContainer, FlexContainer, ButtonWithLoader } from 'components';
import Auth from 'contexts/Auth';
import { login } from './function';

export default function StudentLogin() {
	const [selectedDate, handleDateChange] = useState(new Date());
	const [registerNo, setRegisterNo] = useState('');
	const { setAuth } = useContext(Auth);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		if (selectedDate.toDateString() === 'Invalid Date' || loading) return;
		setLoading(true);
		try {
			const { data: resData } = await axios.post('/student/login', {
				registerNumber: registerNo,
				dateOfBirth: format(new Date(selectedDate), 'yyyy-MM-dd')
			});
			setLoading(false);
			login(setAuth, {
				isAuth: true,
				role: 'student',
				name: resData.name,
				token: resData.token
			});
		} catch (error) {
			setLoading(false);
			error.handleGlobally && error.handleGlobally();
		}
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
						<ButtonWithLoader loading={loading} text='LOGIN' />
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
