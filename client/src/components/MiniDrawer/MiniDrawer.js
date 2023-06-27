import * as React from 'react';
import {useState,useEffect} from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack, Tooltip, Badge, Switch} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link,Outlet } from 'react-router-dom';
import './MiniDrawer.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



const drawerWidth = 240;

export const ModeContext = React.createContext();

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
 
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  boxShadow: 'none',
  // border:'none !important'
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        background: 'linear-gradient(180deg, #468DFE 0%, #0A218B 100%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper':{
         ...closedMixin(theme),
        background: 'linear-gradient(180deg, #468DFE 0%, #0A218B 100%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    }),
  }),
);

export default function MiniDrawer({children,title}) {

  const [datacred,setDatacred]= useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
            
            axios.get('http://localhost:5000/api/users/myprofile',{
                headers:{
                    'x-token' : localStorage.token
                }
            }).then( res=> {
                setDatacred(res.data)
                
            }).catch((err)=>console.log(err))
            console.log(localStorage.token)
            if(localStorage.token=='Email not found' || localStorage.token=='Invalid Creadentials' || localStorage.token=='null')
            {
                navigate('/login')
            }

        },[])
        

    
    const logout=()=>{
        localStorage.token=null
        navigate('/login')
    }

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = (event) => {
  setOpen(false)
};

const [mode,setMode] = React.useState(false)
const theme1 = createTheme({
  palette:{
     mode : mode ? 'light' : 'dark',
     background: {
      default: mode && '#f5f6fa'  ,
      paper: mode ? '#ffffff' : '#0E1C5E',
     
    },
  }
})



// const [title,setTitle] =React.useState("")

// const handleTitleChange = (variable) =>{
//   setTitle(variable)
// }


const [openProfile, setOpenProfile] = React.useState(false);
const anchorRef = React.useRef(null);

const handleToggle = () => {
  setOpenProfile((prevOpenProfile) => !prevOpenProfile);
};

const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpenProfile(false);
};

function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpenProfile(false);
  } else if (event.key === 'Escape') {
    setOpenProfile(false);
  }
}

const prevOpenProfile = React.useRef(openProfile);
React.useEffect(() => {
  if (prevOpenProfile.current === true && openProfile === false) {
    anchorRef.current.focus();
  }

  prevOpenProfile.current = openProfile;
}, [openProfile]);


const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  return (
    <ModeContext.Provider value={{mode}}>
    <ThemeProvider theme={theme1}>
    <Box sx={{ display: 'flex', background: mode ? '#f5f6fa' : 'linear-gradient(180deg, #2C69D1 0%, #51C7EF 100%)' , height:'100vh',  overflowY:'auto',overflowX:'hidden'}}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{   background: mode ? '#f5f6fa' :' #2C69D1',}}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon  sx={{color:'white'}} />
          </IconButton>
          <Typography variant="h5" noWrap component="div" color={mode ? 'black' : 'white'} sx={{letterSpacing:'2px',textTransform:'uppercase'}}>
           { title }
          </Typography>
          { !isSmallScreen ?
            <>
          <Stack direction='row' spacing={2} style={{ marginLeft: 'auto' }}>
            <Tooltip title='Change Mode'>
              <Switch onClick={() => setMode(!mode)} style={{color:'white'}}></Switch>
            </Tooltip>
            <Tooltip title='Notifications'>
            <IconButton  >
              <Badge  >  
              <NotificationsIcon />
              </Badge>
            </IconButton>
            </Tooltip>
            <Tooltip title='Settings'>
            <IconButton >
              <SettingsIcon />
            </IconButton>
            </Tooltip>
            {/* <Tooltip title='Account'> */}
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={openProfile ? 'composition-menu' : undefined}
          aria-expanded={openProfile ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}

        >
          <AccountCircleIcon />
         
        <Popper
          open={openProfile}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={openProfile}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose} ><button onClick={logout} style={{border:'0px solid #0E1C5E', background:'#0E1C5E',color:'white'}}>Logout</button></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </IconButton>
            {/* </Tooltip> */}
          </Stack>
          </> :  
          <div style={{marginLeft:'auto'}}>
             <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={openProfile ? 'composition-menu' : undefined}
          aria-expanded={openProfile ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}

        >
          <AccountCircleIcon />
         
        <Popper
          open={openProfile}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={openProfile}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose} >Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </IconButton>
          <IconButton
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        aria-controls="header-menu"
        aria-haspopup="true"
      >
        <MoreVertIcon  sx={{color:'white'}}/>
      </IconButton>
      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Stack direction='column' spacing={2} style={{ marginLeft: 'auto' }}>
            <Tooltip title='Change Mode'>
              <Switch onClick={() => setMode(!mode)} style={{color:'white'}}></Switch>
            </Tooltip>
            <Tooltip title='Notifications'>
            <IconButton  >
              <Badge  >  
              <NotificationsIcon />
              </Badge>
            </IconButton>
            </Tooltip>
            <Tooltip title='Settings'>
            <IconButton >
              <SettingsIcon />
            </IconButton>
            </Tooltip>
            {/* <Tooltip title='Account'> */}
       
        </Stack>
      </Menu>
          </div>}
        </Toolbar>
      </AppBar>
     
      <Drawer
        variant="permanent"
        open={open}
       
      >
        <DrawerHeader  >
        <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 0.5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon  sx={{color:'white'}} />
          </IconButton>
          <IconButton onClick={handleDrawerClose} sx={{ display: !open && 'none' }}>
            <ChevronLeftIcon  sx={{color:'white'}} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}  >
            <ListItem disablePadding className='sidebarelement'>
              <ListItemButton component={Link} to={"/"}
                sx={{
                  minHeight: 48,
                  justifyContent:  open ? 'initial' : 'center',          
                  px: 2.5,
                }}
                disableRipple
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:  open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 < DashboardIcon  sx={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 ,color:'white'}} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding  className='sidebarelement'>
              <ListItemButton component={Link} to={"/analytics"}
                sx={{
                  minHeight: 48,
                  justifyContent:  open ? 'initial' : 'center',
                  px: 2.5,
                }}
                disableRipple
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:  open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <BarChartIcon  sx={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary="Analytics" sx={{ opacity: open ? 1 : 0 ,color:'white' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='sidebarelement'  >
              <ListItemButton component="a" to={"/alerts"} 
                sx={{
                  minHeight: 48,
                  justifyContent:  open ? 'initial' : 'center',
                  px: 2.5,
                }}
                disableRipple
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:  open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 
                 <AssessmentIcon  sx={{color:'white'}} />
                </ListItemIcon>
                <ListItemText primary="Alerts" sx={{ opacity: open ? 1 : 0, color:'white' }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
     
      <Box component="main" sx={{ flexGrow: 1, p: 3,}}>
        <DrawerHeader />
        {children}
        {/*<Routes>
        <Route  path="/" element={<Home  onTitleChange= {handleTitleChange}/>} />
        <Route path="/analytics" element={<Analytics onTitleChange= {handleTitleChange} />}  />
        <Route path="/alerts" element={<Alerts onTitleChange= {handleTitleChange} />}  />

        </Routes> */}
        <Outlet />
      </Box>
     
    </Box>
    </ThemeProvider>
    </ModeContext.Provider>
  );
}
