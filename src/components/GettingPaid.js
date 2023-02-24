import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material'
import '../assets/style.css'
import Checkbox from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const GettingPaid = () => {
  return (
    <Grid sx={{ width: '100%' }} container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        justifyContent='center'
        alignItems='center'
      >
        <Typography gutterBottom variant='h4' textAlign='center'>
          Getting Paid
        </Typography>
        <Typography gutterBottom textAlign='center'>
          Let’s get you paid.
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={8}
        direction='column'
        spacing={2}
      >
        <Grid item>
          <Card style={{ borderRadius: '0' }}>
            {/* <CardMedia
                        component='img'
                        height='140'
                        image='/static/images/cards/contemplative-reptile.jpg'
                        alt='green iguana'
                        /> */}
            <CardContent>
              <Grid container direction='row' spacing={3}>
                <Grid item container>
                  <Grid xs={12} sm={4} md={4}>
                    <p className='input-label'> Payment schedule </p>
                    <div className='input-required subtitle'>Required</div>
                  </Grid>
                  <Grid xs={12} sm={8} md={8}>
                    <RadioGroup
                      aria-label='role'
                      defaultValue='is'
                      name='radio-buttons-group'
                    >
                      <FormControlLabel
                        value='is'
                        control={<Radio sx={{ fontWeight: 'bold' }} />}
                        label='Monthly'
                      />
                      <div
                        className='subtitle'
                        style={{ marginLeft: '30px', marginBottom: '10px' }}
                      >
                        Charge my patrons at the start of every month.
                      </div>
                    </RadioGroup>
                    <Checkbox
                      {...label}
                      disabled
                      style={{ marginLeft: '20px' }}
                    />{' '}
                    Charge Patrons up front <br />
                    <Button
                      variant='contained'
                      color='info'
                      style={{
                        borderRadius: '24px',
                        padding: '8px',
                        marginBottom: '8px',
                        marginLeft: '65px',
                      }}
                    >
                      Verify to enable charge up front
                    </Button>
                    <Typography
                      className='subtitle'
                      style={{ marginLeft: '65px' }}
                    >
                      New patrons will be charged the day they become a patron,
                      then on the 1st of the month going forward.
                    </Typography>
                    <Link href='#' className='blue-link'>
                      Learn more
                    </Link>
                    <RadioGroup
                      aria-label='role'
                      defaultValue='is'
                      name='radio-buttons-group'
                    >
                      <FormControlLabel
                        value='are'
                        control={<Radio disabled />}
                        label='Per Creation'
                      />
                      <div
                        className='subtitle'
                        style={{
                          marginLeft: '30px',
                          color: 'rgba(0, 0, 0, 0.38',
                        }}
                        disabled
                      >
                        Charge my patrons at the start of every month.
                      </div>
                      <div
                        className='subtitle'
                        style={{ marginLeft: '30px' }}
                        disabled
                      >
                        Your plan only supports a monthly payment schedule.
                      </div>
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                        </CardActions> */}
          </Card>
        </Grid>
        <Grid item>
          <Card style={{ borderRadius: '0' }}>
            {/* <CardMedia
                        component='img'
                        height='140'
                        image='/static/images/cards/contemplative-reptile.jpg'
                        alt='green iguana'
                        /> */}
            <CardContent>
              <Grid container direction='row' spacing={3}>
                <Grid item container>
                  <Grid xs={12} sm={4} md={4}>
                    <p className='input-label'> Edit payout settings </p>
                    <Link href='#' className='blue-link'>
                      Learn more
                    </Link>
                  </Grid>
                  <Grid xs={12} sm={8} md={8}>
                    <Typography className='subtitle'>
                      Once your creator page is launched, you can edit your
                      payout settings, including how you'd like to get paid and
                      your tax information.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                        </CardActions> */}
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Button
          variant='contained'
          disabled
          fullWidth
          style={{ borderRadius: '24px', padding: '12px', marginBottom: '4px' }}
        >
          Save Changes
        </Button>
        <Card style={{ borderRadius: '0' }}>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              CHECKLIST
            </Typography>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <CheckCircle style={{ color: 'green' }} />
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: 'green' }}>Set your page name</span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <RadioButtonUnchecked style={{ color: 'red' }} />
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: 'red' }}>Create your headline</span>
                <div className='input-required subtitle'>
                  Required.{' '}
                  <Link href='#' className='blue-link'>
                    Add Now
                  </Link>{' '}
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <CheckCircle style={{ color: 'green' }} />
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: 'green' }}>Verify email address</span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <CheckCircle style={{ color: 'green' }} />
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: 'green' }}>Upload profile picture</span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <RadioButtonUnchecked style={{ color: 'red' }} />
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: 'red' }}>Upload cover image</span>
                <div className='input-required subtitle'>
                  Required.{' '}
                  <Link href='#' className='blue-link'>
                    Add Now
                  </Link>{' '}
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <RadioButtonUnchecked style={{ color: 'red' }} />
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: 'red' }}>Create about section</span>
                <div className='input-required subtitle'>
                  Required.{' '}
                  <Link href='#' className='blue-link'>
                    Add Now
                  </Link>{' '}
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <RadioButtonUnchecked style={{ color: 'red' }} />
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: 'red' }}>Finish account details</span>
                <div className='input-required subtitle'>
                  Required.{' '}
                  <Link href='#' className='blue-link'>
                    Add Now
                  </Link>{' '}
                </div>
              </Grid>
            </Grid>
            <Typography gutterBottom variant='h6' component='div'>
              <p className='input-label'>LEARN MORE</p>
            </Typography>

            <ul>
              <li>
                <Link href='#' className='gray-link'>
                  Membership 101: Best Practices
                </Link>
              </li>
              <li>
                <Link href='#' className='gray-link'>
                  How to choose your business model
                </Link>
              </li>
              <li>
                <Link href='#' className='gray-link'>
                  How to talk about Patreon to your audience
                </Link>
              </li>
              <li>
                <Link href='#' className='gray-link'>
                  Knowing your worth as a creator
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
export default GettingPaid
