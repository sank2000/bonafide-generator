import { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

import { Welcome } from 'pages';

export default function AppRouter() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Switch>
			<Route path='/' exact component={Welcome} />
			<Redirect to='/' />
		</Switch>
	);
}
