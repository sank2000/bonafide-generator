import { Switch, Route, Redirect } from 'react-router-dom';

import { AdminHome, AdminStaff, AdminStudent, AdminSection, Admin as AdminDash } from 'pages';
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
				<Route path='/admin' exact component={AdminDash} />
				<Redirect path='*' to='/' />
			</Switch>
		</>
	);
}
