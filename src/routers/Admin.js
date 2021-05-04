import { Switch, Route, Redirect } from 'react-router-dom';

import { AdminHome } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/' exact component={AdminHome} />
				<Redirect path='*' to='/' />
			</Switch>
		</>
	);
}
