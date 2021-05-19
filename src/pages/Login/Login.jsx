import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Typography, TextField } from '@material-ui/core';
import { useParams } from 'react-router';
import axios from 'axios';

import { BgContainer, ButtonWithLoader, FlexContainer } from 'components';
import Auth from 'contexts/Auth';
import { login } from './function';
import { handleChange } from 'functions';

export default function Login() {
	const { role } = useParams();
	const { setAuth } = useContext(Auth);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		try {
			const url = role === 'admin' ? '/admin/login' : '/staff/login';
			const { data: resData } = await axios.post(url, { ...data });
			setLoading(false);
			login(setAuth, {
				isAuth: true,
				role,
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
				<img src={`/images/${role}.png`} alt={role}></img>
				<Typography variant='h5' color='primary' style={{ fontWeight: '600' }}>
					LOGIN
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label='Email'
						required
						name='email'
						type='email'
						value={data.email}
						onChange={handleChange(setData)}
					/>
					<TextField
						label='Password'
						required
						type='password'
						name='password'
						value={data.password}
						onChange={handleChange(setData)}
					/>
					<ButtonWithLoader loading={loading} text='LOGIN' />
				</form>
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
