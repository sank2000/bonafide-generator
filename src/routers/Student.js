import { Switch, Route, Redirect } from 'react-router-dom';

import { StudentProfile } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/profile' exact component={StudentProfile} />
				<Redirect path='*' to='/profile' />
			</Switch>
		</>
	);
}
