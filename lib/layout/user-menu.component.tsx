import React, { MouseEvent, useContext, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Link from 'next/link';
import { AuthContext } from '../auth/auth.hook';

const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { username } = useContext(AuthContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const UserPostsMenuItem = useMemo(() => {
    return React.forwardRef((props, ref) => (
      <Link href={`/${username}/`}>
        <MenuItem onClick={handleClose} innerRef={ref}>
          My posts
        </MenuItem>
      </Link>
    ));
  }, [username]);

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountIcon></AccountIcon>
      </Button>
      <Menu
        id="simple-menu"
        keepMounted
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <UserPostsMenuItem></UserPostsMenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
