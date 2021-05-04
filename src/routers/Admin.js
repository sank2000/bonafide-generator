import { Switch, Route, Redirect } from 'react-router-dom';

import { AdminHome, AdminStaff } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/' exact component={AdminHome} />
				<Route path='/staff' exact component={AdminStaff} />
				<Redirect path='*' to='/' />
			</Switch>
		</>
	);
}
