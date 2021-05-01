import { Switch, Route, Redirect } from 'react-router-dom';

import { Welcome, Login, StudentLogin } from 'pages';

export default function Base() {
	return (
		<Switch>
			<Route path='/' exact component={Welcome} />
			<Route path='/student/login' exact component={StudentLogin} />
			<Route path='/:role/login' exact component={Login} />
			<Redirect to='/' />
		</Switch>
	);
}
