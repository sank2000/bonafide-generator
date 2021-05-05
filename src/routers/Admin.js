import { Switch, Route, Redirect } from 'react-router-dom';

import { AdminHome, AdminStaff, AdminStudent, AdminSection } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/' exact component={AdminHome} />
				<Route path='/staff' exact component={AdminStaff} />
				<Route path='/student' exact component={AdminStudent} />
				<Route path='/section' exact component={AdminSection} />
				<Redirect path='*' to='/' />
			</Switch>
		</>
	);
}
