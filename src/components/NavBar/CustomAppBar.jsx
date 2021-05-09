import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircleTwoTone as AccountCircle } from '@material-ui/icons';

import Drawer from './SideBar';
import Auth from 'contexts/Auth';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			alignItems: 'center'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	title: {
		textTransform: 'capitalize'
	},
	active: {
		width: '1rem',
		height: '1rem',
		borderRadius: '50%',
		marginRight: '1rem',
		backgroundColor: 'green'
	}
}));

export default function NavBar() {
	const classes = useStyles();
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const location = useLocation();
	const { auth } = useContext(Auth);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			getContentAnchorEl={null}
		>
			<MenuItem>
				<div className={classes.active}>&nbsp;</div>
				<Typography variant='h6' noWrap>
					{auth?.name}
				</Typography>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar elevation={3} position='fixed'>
				<Toolbar>
					<Drawer />
					<Typography variant='h4' className={classes.title} noWrap>
						{location?.pathname.split('/')[1] ? location?.pathname.split('/')[1] : 'home'}
					</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Typography variant='h6' noWrap>
							{auth?.name}
						</Typography>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<AccountCircle fontSize='large' />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			<Toolbar />
		</div>
	);
}
