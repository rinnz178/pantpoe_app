import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import logo from '../assets/images/logo.png'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { SmsOutlined } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Sidebar from '../layout/Sidebar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: '100%',
  color: '#000',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: 'autoc',
      },
    },
  },
}))

export default function NavBar() {
  const theme = useTheme()
  const ismatch = useMediaQuery(theme.breakpoints.up('md'))

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <Box style={{ padding: 0 }}>
        <AppBar position='static' style={{ backgroundColor: '#fff' }}>
          <Toolbar>
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <Avatar
                alt='Remy Sharp'
                src={logo}
                sx={{ width: 54, height: 54 }}
              />
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7}></Grid>
            <Grid container item xs={8} sm={6} md={1} lg={4}>
              <Grid
                item
                sm={8}
                md={8}
                lg={9}
                style={{ display: ismatch ? '' : 'none' }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder='Find a creator'
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Grid>
              <Grid
                item
                sm={2}
                md={2}
                lg={1}
                style={{ display: ismatch ? '' : 'none' }}
              >
                <SmsOutlined
                  style={{
                    color: 'black',
                    marginTop: '6px',
                    marginLeft: '18px',
                  }}
                />
              </Grid>
              <Grid
                item
                sm={1}
                md={1}
                lg={1}
                style={{ display: ismatch ? '' : 'none' }}
              >
                <Tooltip title='Account settings'>
                  <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 40, height: 32 }} src={logo}>
                      C
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            {ismatch || <Sidebar />}
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Finish Page</MenuItem>
        <MenuItem>Posts from my creators</MenuItem>
        <MenuItem>My profile</MenuItem>
        <MenuItem>Expore creators</MenuItem>
        <MenuItem>Manage memberships</MenuItem>
        <MenuItem>My profile settings</MenuItem>
        <MenuItem>Help Center & FAQ</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </React.Fragment>
  )
}
