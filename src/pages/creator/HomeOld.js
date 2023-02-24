import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { BiEdit, BiCog, BiSpreadsheet } from 'react-icons/bi'
import HomeIcon from '@mui/icons-material/Home'
import SubjectIcon from '@mui/icons-material/Subject'
import PeopleIcon from '@mui/icons-material/People'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ButtonGroup from '@mui/material/ButtonGroup'
import { CustomButton } from '../../layout/CutomerButton'
import DeleteIcon from '@mui/icons-material/Delete'
const useStyles = makeStyles((theme) => ({
  sideMenu: {
    minHeight: '100vh',
    backgroundColor: 'rgb(245, 244, 242)',
    borderRight: '1px solid rgb(229, 227, 221)',
    position: 'fixed',
    minWidth: '240px',
  },
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
  },

  accType: {
    color: 'rgb(112, 108, 100)',
    fontFamily: 'aktiv-grotesk, sans-serif',
    margin: 0,
    position: 'relative',
    transition: 'all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s',
    fontWeight: '700 !important',
  },
  firstdiv: {
    border: '1px solid rgb(229,227,221) !important',
    borderRadius: '4px',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
  },

  iconBtn: {
    backgroundColor: 'rgb(229, 227, 221)',
    width: '2.25rem',
    height: '2.25rem',
  },
  lastListItem: {
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid rgb(229, 227, 221)',
    minWidth: '240px',
  },

  rightContent: {
    marginLeft: '240px',
    paddingLeft: '160px',
    paddingRight: '160px',
  },
  info: {
    paddingTop: '30px',
  },
  activePantpoe: {
    borderRight: '1px solid rgb(229,227,221)',
    paddingRight: theme.spacing(2),
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
  income: {
    paddingLeft: theme.spacing(2),
  },

  overview: {
    '& h4,p,a': {
      margin: 0,
    },
    '& h4': {
      fontSize: '1.625rem',
    },
    '& p': {
      marginBottom: theme.spacing(1),
    },
  },
  boxBorder: {
    borderRadius: '4px',
    border: '1px solid rgb(229,227,221)',
    padding: theme.spacing(2),
  },
  boxBordertwo: {
    borderRadius: '4px',
    border: '1px solid rgb(229,227,221)',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '& h6 , div': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '& h6': {
      paddingBottom: theme.spacing(2),
    },
    '& div': {
      paddingTop: theme.spacing(1),
      textAlign: 'center',
    },
  },
  mtop: {
    marginTop: theme.spacing(2),
  },
  smallTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    margin: 0,
  },
  actionIcon: {
    '& .MuiIconButton-root ': {
      backgroundColor: 'rgb(229,227,221)',
    },
  },
}))
const CreatorHome = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item sm={2} className={classes.sideMenu}>
        <Box textAlign='center' style={{ margin: '24px 24px 0px' }}>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/1.jpg'
            sx={{ width: 64, height: 64, margin: '8px auto' }}
          />
          <Box>
            <Typography variant='subtitle1' className={`${classes.wrapIcon} `}>
              aye chan oo <ChevronRightIcon />
            </Typography>
            <Typography variant='subtitle2' className={classes.accType}>
              Creator account
            </Typography>
          </Box>
          <Grid
            mt={1}
            mb={1}
            container
            direction='row'
            justifyContent='space-evenly'
            alignItems='center'
          >
            <IconButton
              onClick={() => {
                console.log('heo')
              }}
              size='small'
              sx={{ ml: 2 }}
            >
              <Avatar className={classes.iconBtn}>
                <BiEdit style={{ color: '#2d271b' }} />
              </Avatar>
            </IconButton>
            <IconButton>
              <Avatar className={classes.iconBtn}>
                <BiCog style={{ color: '#2d271b' }} />
              </Avatar>
            </IconButton>
          </Grid>
        </Box>
        <Divider />

        <List style={{ padding: 0 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary='Posts' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Pantpoes' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary='Page' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary='Icome' />
            </ListItemButton>
          </ListItem>
        </List>
        <Button className={classes.lastListItem}>Creator Resources</Button>
      </Grid>
      <Grid item sm={10} className={classes.rightContent}>
        <div className={classes.info}>
          <h1>Hi, aye chan oo!</h1>
        </div>
        <Grid container spacing={3}>
          <Grid item sm={7}>
            <Typography variant='subtitle1'>OVERVIEW</Typography>
            <Box className={classes.firstdiv}>
              <Box display='flex' className={classes.activePantpoe}>
                <PeopleIcon className={classes.icon} fontSize='large' />
                <Box className={classes.overview}>
                  <h4>0</h4>
                  <p>active pantpoes</p>
                  <Link>View Relationship manager</Link>
                </Box>
              </Box>
              {/* inconme start */}
              <Box display='flex' className={classes.income}>
                <MonetizationOnIcon className={classes.icon} fontSize='large' />
                <Box className={classes.overview}>
                  <h4>0</h4>
                  <p>per month</p>
                  <Link>View earnings dashboard</Link>
                </Box>
              </Box>
            </Box>

            {/* make post start */}

            <Typography variant='subtitle1' mt={5}>
              NEXT STEPS
            </Typography>
            <Box className={`${classes.boxBorder}`}>
              <Typography variant='h6' gutterBottom component='div'>
                Make your first post
              </Typography>
              <Typography variant='subtitle1' color='gray'>
                Create at least one post for your page before you announce so
                your fans can see what they're getting for their membership.
              </Typography>
              <Box
                className={classes.actionIcon}
                display='flex'
                justifyContent='space-around'
              >
                <div>
                  <IconButton aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                  <Typography>Text</Typography>
                </div>

                <div>
                  <IconButton aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                  <Typography>Image</Typography>
                </div>
                <div>
                  <IconButton aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                  <Typography>Video</Typography>
                </div>
                <div>
                  <IconButton aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                  <Typography>Audio</Typography>
                </div>
                <div>
                  <IconButton aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                  <Typography>Link</Typography>
                </div>
                <div>
                  <IconButton aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                  <Typography>Poll</Typography>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Typography variant='subtitle1'>RECENT ACTIVITY</Typography>
            <Box className={`${classes.boxBorder}`}>
              <h6 className={classes.smallTitle}>
                No unread messages from patrons
              </h6>
              <Link>View Messages</Link>
            </Box>
            <Box className={`${classes.boxBordertwo} ${classes.mtop}`}>
              <h6 className={classes.smallTitle}>RECENT POSTS</h6>
              <Divider />
              <div>
                <Typography variant='subtitle1' color='gray'>
                  You haven't posted anything yet
                </Typography>
                <CustomButton>Make a post</CustomButton>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CreatorHome
