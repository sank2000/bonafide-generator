import { useState } from 'react';

import { useAlStyles } from 'constants/classes';
import NewRequest from './NewRequest';
import History from './History';

export default function CustomPaginationActionsTable() {
	const classes = useAlStyles();
	const [loadData, setLoadData] = useState(false);

	return (
		<section className={classes.section}>
			<NewRequest loadData={loadData} setLoadData={setLoadData} />
			<History loadData={loadData} />
		</section>
	);
}
