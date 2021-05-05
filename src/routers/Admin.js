import { Switch, Route, Redirect } from 'react-router-dom';

import { AdminHome, AdminStaff, AdminStudent } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/' exact component={AdminHome} />
				<Route path='/staff' exact component={AdminStaff} />
				<Route path='/student' exact component={AdminStudent} />
				<Redirect path='*' to='/' />
			</Switch>
		</>
	);
}
