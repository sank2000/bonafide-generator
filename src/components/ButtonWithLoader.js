import { Button } from '@material-ui/core';

import ButtonLoader from './ButtonLoader';

export default function ButtonWithLoader({ loading, text, ...props }) {
	return (
		<Button variant='contained' color='primary' type='submit' {...props}>
			{text} {loading && <ButtonLoader />}
		</Button>
	);
}
