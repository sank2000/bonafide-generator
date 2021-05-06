import { Switch, Route, Redirect } from 'react-router-dom';

import { StaffProfile } from 'pages';
import { AppBar } from 'components';

export default function Admin() {
	return (
		<>
			<AppBar />
			<Switch>
				<Route path='/profile' exact component={StaffProfile} />
				<Redirect path='*' to='/profile' />
			</Switch>
		</>
	);
}
