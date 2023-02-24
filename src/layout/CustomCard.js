import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import avatarlog from '../assets/images/avatar1.jpeg'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const useStyles = makeStyles((theme) => ({
  custom: {
    '& .MuiCard-root': {
      borderRadius: 0,
    },
  },

  imgShadow: {
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default function MediaCard() {
  const classes = useStyles()
  return (
    <Card style={{ borderRadius: 0 }}>
      <CardMedia
        component='img'
        height='auto'
        image={avatarlog}
        alt='green iguana'
        className={classes.imgShadow}
      />
      <CardContent>
        <Box className={classes.header}>
          <Box>
            <Typography variant='h5' component='div'>
              Mikki Kendall
            </Typography>
            <Typography variant='body1' align='left'>
              Designer
            </Typography>
          </Box>

          <Typography variant='h5'>
            <ArrowForwardIosIcon fontSize='large' />
          </Typography>
        </Box>

        <Typography
          style={{ marginTop: '16px', marginBottom: '23px' }}
          align='left'
          variant='body1'
          color='text.secondary'
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  )
}
