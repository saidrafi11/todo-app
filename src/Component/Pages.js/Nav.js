import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
// import  Container  from 'postcss';
import Container from '@mui/material/Container';
import React, { useContext } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from './Context/AuthProvider';



// const pages = ['Add Task', 'My Task', 'Completed Tasks'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



const Nav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => { 
        console.log('loggedput');
      })
      .catch(err => console.log(err))
  }

    return (
        <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TODO
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
                  <MenuItem key={'addtask'} onClick={handleCloseNavMenu}>
                    <Link to={'/'} textAlign="center">Add task</Link>
                  </MenuItem>
                  <MenuItem key={'myTask'} onClick={handleCloseNavMenu}>
                    <Link to={'mytask'} textAlign="center">My task</Link>
                  </MenuItem>
                  <MenuItem key={'compleatedtask'} onClick={handleCloseNavMenu}>
                    <Link to={'/compleatedtask'} textAlign="center">Compleated task</Link>
                  </MenuItem>
                
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            TODO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
                <Button
                  key={'addTask'}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 <Link to={'/'} textAlign="center">Add task</Link>
                </Button>
                <Button
                  key={'myTask'}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 <Link to={'/mytask'} textAlign="center">My task</Link>
                </Button>
                <Button
                  key={'compleatedTask'}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 <Link to={'/compleatedtask'} textAlign="center">Compleated task</Link>
                </Button>
          
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                
                  {user? 
                
                  <MenuItem key={'logOut'} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogOut} textAlign="center">Log out</Typography>
                  </MenuItem>
                  
                  
                  :
                  <MenuItem key={'logOut'} onClick={handleCloseUserMenu}>
                  <Link to={'/login'} textAlign="center">Sign in</Link>
                </MenuItem>
                  
                  }
               
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default Nav;