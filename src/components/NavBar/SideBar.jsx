import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import colors from 'constants/colors';
import logo from 'assets/logo';

const useStyles = makeStyles({
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
		margin: '0 auto'
	},
	link: {
		textDecoration: 'none'
	}
});

function Item({ name, link }) {
	const classes = useStyles();

	return (
		<Link className={classes.link} to={link}>
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

	const toggleDrawer = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

	const list = () => (
		<Fragment>
			<img src={logo} alt='logo' className={classes.logo}></img>
			<List className={classes.list}>
				<Item name='Home' link='/' />
				<Item name='New Request' link='/new' />
				<Item name='Update Request' link='/update' />
				<Item name='Rejected Request' link='/reject' />
				<Item name='All Profiles' link='/allprofiles' />
				<ListItem>
					<Typography variant='h6' className={classes.text}>
						Logout
					</Typography>
				</ListItem>
			</List>
		</Fragment>
	);

	return (
		<div>
			<React.Fragment>
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
			</React.Fragment>
		</div>
	);
}
