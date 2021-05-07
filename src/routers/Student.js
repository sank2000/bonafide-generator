import { Switch, Route, Redirect } from 'react-router-dom';

import { StudentProfile, StudentBonafide } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/profile' exact component={StudentProfile} />
				<Route path='/bonafide' exact component={StudentBonafide} />
				<Redirect path='*' to='/profile' />
			</Switch>
		</>
	);
}
