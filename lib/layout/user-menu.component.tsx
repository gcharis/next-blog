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
        <LinkMenuItem onClick={handleClose} href={`/${username}`}>
          My posts
        </LinkMenuItem>
        <LinkMenuItem onClick={handleClose} href={`/${username}/new`}>
          Create new
        </LinkMenuItem>
      </Menu>
    </div>
  );
};

export const LinkMenuItem = React.forwardRef<
  React.ReactElement,
  React.PropsWithChildren<{ href: string; onClick: () => void }>
>((props, ref) => (
  <Link href={props.href}>
    <MenuItem {...props} innerRef={ref}>
      {props.children}
    </MenuItem>
  </Link>
));

export default UserMenu;
