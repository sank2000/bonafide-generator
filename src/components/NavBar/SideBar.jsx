import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	Typography,
	Backdrop,
	CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import colors from 'constants/colors';
import logo from 'assets/logo';
import Auth from 'contexts/Auth';
import { logout } from 'pages/Login/function';

const useStyles = makeStyles(theme => ({
	list: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: 280
	},
	paper: {
		background: colors.primary,
		color: 'white'
	},
	logo: {
		width: '40%',
		margin: '1rem auto'
	},
	menuButton: {
		fontSize: '40'
	},
	text: {
		color: '#fff',
		cursor: 'pointer',
		textTransform: 'uppercase',
		margin: '0 auto'
	},
	link: {
		textDecoration: 'none'
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1000,
		color: '#fff'
	}
}));

function Item({ name, link, ...props }) {
	const classes = useStyles();

	return (
		<Link className={classes.link} to={link} {...props}>
			<ListItem>
				<Typography variant='h6' className={classes.text}>
					{name}
				</Typography>
			</ListItem>
		</Link>
	);
}

export default function SideBar() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const classes = useStyles();
	const { auth, setAuth } = useContext(Auth);
	const [open, setOpen] = useState(false);

	const toggleDrawer = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

	const handleLogout = () => {
		setDrawerOpen(false);
		setOpen(true);
		setTimeout(() => {
			logout(setAuth);
		}, 1000);
	};

	const links = {
		admin: [
			{
				name: 'Home',
				link: '/'
			},
			{
				name: 'Staff',
				link: '/staff'
			},
			{
				name: 'Student',
				link: '/student'
			},
			{
				name: 'Section',
				link: '/section'
			},
			{
				name: 'Admin',
				link: '/admin'
			}
		],
		staff: [
			{
				name: 'Profile',
				link: '/Profile'
			},
			{
				name: 'Action',
				link: '/action'
			},
			{
				name: 'Student',
				link: '/student'
			}
		],
		student: [
			{
				name: 'Profile',
				link: '/profile'
			},
			{
				name: 'Bonafide',
				link: '/bonafide'
			}
		]
	};

	const list = () => (
		<Fragment>
			<img src={logo} alt='logo' className={classes.logo}></img>
			<List className={classes.list}>
				{links[auth.role].map((data, ind) => {
					return (
						<Item
							name={data.name}
							link={data.link}
							key={ind}
							onClick={() => setDrawerOpen(false)}
						/>
					);
				})}
				<ListItem>
					<Typography variant='h6' className={classes.text} onClick={handleLogout}>
						LOGOUT
					</Typography>
				</ListItem>
			</List>
		</Fragment>
	);

	return (
		<div>
			<Fragment>
				<IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					onClick={toggleDrawer(true)}
				>
					<MenuIcon fontSize='large' />
				</IconButton>
				<Drawer
					anchor={'left'}
					open={drawerOpen}
					onClose={toggleDrawer(false)}
					classes={{ paper: classes.paper }}
				>
					{list()}
				</Drawer>
				<Backdrop className={classes.backdrop} open={open}>
					<CircularProgress color='inherit' />
				</Backdrop>
			</Fragment>
		</div>
	);
}
