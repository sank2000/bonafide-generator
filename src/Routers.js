import { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

import { Welcome, Login, StudentLogin } from 'pages';

export default function AppRouter() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Switch>
			<Route path='/' exact component={Welcome} />
			<Route path='/student/login' exact component={StudentLogin} />
			<Route path='/:role/login' exact component={Login} />
			<Redirect to='/' />
		</Switch>
	);
}
