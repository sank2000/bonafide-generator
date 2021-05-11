export const handleChange = setData => {
	return e => {
		const { name, value } = e.target;
		setData(old => ({
			...old,
			[name]: value
		}));
	};
};
