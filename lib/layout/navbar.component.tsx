import { AppBar, Toolbar, Button, Typography, createStyles, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { AuthContext } from '../auth/auth.hook';
import Link from 'next/link';
import UserMenu from './user-menu.component';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,

      '&:hover': {
        color: theme.palette.grey[300],
      },
    },
  }),
);

const Navbar: React.FC = () => {
  const classes = useStyles();
  const { userId } = useContext(AuthContext);

  return (
    <nav className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/posts">
              <a>Next Blog</a>
            </Link>
          </Typography>

          {(userId && <LogoutButton />) || <LoginButton />}

          {userId && <UserMenu></UserMenu>}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export const LogoutButton: React.FC = () => {
  return (
    <Button color="inherit">
      <Link href="/logout">Logout</Link>
    </Button>
  );
};

export const LoginButton: React.FC = () => {
  return (
    <Button color="inherit">
      <Link href="/enter">Login</Link>
    </Button>
  );
};

export default Navbar;
