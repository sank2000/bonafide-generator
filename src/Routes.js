import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Base, Admin, Staff, Student } from 'routers';
import Auth from 'contexts/Auth';

export default function AppRouter() {
	const { pathname } = useLocation();
	const { auth } = useContext(Auth);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return auth?.isAuth ? (
		<>
			{auth?.role === 'admin' && <Admin />}
			{auth?.role === 'staff' && <Staff />}
			{auth?.role === 'student' && <Student />}
		</>
	) : (
		<Base />
	);
}
