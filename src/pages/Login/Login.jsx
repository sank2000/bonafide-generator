import { useState } from 'react';
import styled from 'styled-components';
import { Typography, TextField, Button } from '@material-ui/core';
import { useParams } from 'react-router';

import { BgContainer, FlexContainer } from 'components';

export default function Login() {
	const { role } = useParams();
	const [data, setData] = useState({
		id: '',
		password: ''
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setData(old => ({
			...old,
			[name]: value
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(data);
	};

	return (
		<BgContainer>
			<Box>
				<img src={`/images/${role}.png`} alt={role}></img>
				<Typography variant='h5' color='primary' style={{ fontWeight: '600' }}>
					LOGIN
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField label='ID' required name='id' value={data.id} onChange={handleChange} />
					<TextField
						label='Password'
						required
						name='password'
						value={data.password}
						onChange={handleChange}
					/>
					<Button variant='contained' color='primary' type='submit'>
						LOGIN
					</Button>
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