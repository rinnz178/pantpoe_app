import * as React from 'react'
import Card from '@mui/material/Card'
import { makeStyles } from '@mui/styles'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { CardActionArea, CardActions } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  root: {
    lineHeight: 0,
  },
  stretch: {
    height: 'calc(100% - 20px)',
    marginBottom: theme.spacing(2),
  },
  CardContent: {
    paddingLeft: theme.spacing(1),
  },
  linkBtn: {
    color: '#333',
    paddingLeft: theme.spacing(1),
  },
}))

function TopicCard(props) {
  const classes = useStyles()
  const { img, title, info } = props

  return (
    <Card className={classes.stretch}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image='https://live-patreon-marketing.pantheonsite.io/wp-content/uploads/2020/12/is-patreon-right-for-you_2x.jpg'
          alt='green iguana'
        />
        <CardContent className={classes.CardContent}>
          <Typography gutterBottom variant='h6' component='div'>
            <> {title}</>
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            <> {info}</>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a className={classes.linkBtn}>Read More</a>
      </CardActions>
    </Card>
  )
}

export default TopicCard
