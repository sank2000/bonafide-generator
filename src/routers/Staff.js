import { Switch, Route, Redirect } from 'react-router-dom';

import { StaffProfile, StaffStudent } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/profile' exact component={StaffProfile} />
				<Route path='/student' exact component={StaffStudent} />
				<Redirect path='*' to='/profile' />
			</Switch>
		</>
	);
}
