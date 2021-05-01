import { Switch, Route, Redirect } from 'react-router-dom';

import { AdminHome } from 'pages';

export default function Admin() {
	return (
		<Switch>
			<Route path='/' exact component={AdminHome} />
			<Redirect path='*' to='/' />
		</Switch>
	);
}
