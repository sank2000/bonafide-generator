import { Switch, Route, Redirect } from 'react-router-dom';

import { StaffAction, StaffProfile, StaffStudent } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/profile' exact component={StaffProfile} />
				<Route path='/student' exact component={StaffStudent} />
				<Route path='/action' exact component={StaffAction} />
				<Redirect path='*' to='/profile' />
			</Switch>
		</>
	);
}
