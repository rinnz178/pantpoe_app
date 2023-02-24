import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material'
import '../assets/style.css'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const PageSetting = () => {
  const [age, setAge] = React.useState('')

  const handleChangeCountry = (event) => {
    setAge(event.target.value)
  }
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
          Page Settings
        </Typography>
        <Typography gutterBottom textAlign='center'>
          Set your creator details and make a great first impression
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
                  <Grid xs={12} sm={12} md={12}>
                    <p className='input-label'> Creator Account Details </p>
                    <div className='subtitle'>
                      This account information will not appear on your public
                      page.
                    </div>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid xs={4} sm={4} md={4}>
                    <p className='input-label'> Legal First Name </p>
                  </Grid>
                  <Grid xs={8} sm={8} md={8}>
                    <TextField
                      fullWidth
                      required
                      id='outlined-required'
                      label='Required'
                      placeholder='Legal First Name'
                      color='info'
                    />
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid xs={4} sm={4} md={4}>
                    <p className='input-label'> Legal Last Name </p>
                  </Grid>
                  <Grid xs={8} sm={8} md={8}>
                    <TextField
                      fullWidth
                      required
                      id='outlined-required'
                      label='Required'
                      placeholder='Legal Last Name'
                      color='info'
                    />
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid xs={4} sm={4} md={4} alignSelf='center'>
                    <p className='input-label'> Country of Residence </p>
                  </Grid>
                  <Grid xs={8} sm={8} md={8}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-helper-label'>
                        Country
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={age}
                        label='Country'
                        color='info'
                        onChange={handleChangeCountry}
                      >
                        <MenuItem value=''>
                          <em>Choose Country</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {/* <FormHelperText>With label + helper text</FormHelperText> */}
                    </FormControl>
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
                  <Grid xs={4} sm={4} md={4}>
                    <p className='input-label'> Custom brand color </p>
                    <div className='subtitle'>
                      Choose the color visitors will see for links and buttons
                      on your page.
                    </div>
                  </Grid>
                  <Grid xs={8} sm={8} md={8}>
                    <div className='subtitle'>
                      Suggested colors are based on your profile and cover
                      photos. Choose any color—provided it’s dark enough to be
                      legible—by clicking on the option with the pencil icon.
                    </div>
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
                  <Grid xs={4} sm={4} md={4}>
                    <p className='input-label'> Earnings visibility </p>
                  </Grid>
                  <Grid xs={8} sm={8} md={8}>
                    <RadioGroup
                      aria-label='role'
                      defaultValue='is'
                      name='radio-buttons-group'
                    >
                      <FormControlLabel
                        value='is'
                        control={<Radio sx={{ fontWeight: 'bold' }} />}
                        label='Public (recommended)'
                      />
                      <div className='subtitle' style={{ marginLeft: '30px' }}>
                        Anyone who visits your page will see how much you earn
                        per month.
                      </div>
                      <FormControlLabel
                        value='private'
                        control={<Radio sx={{ fontWeight: 'bold' }} />}
                        label='Private'
                      />
                      <div className='subtitle' style={{ marginLeft: '30px' }}>
                        Only you can see how much you earn. Your earnings will
                        be hidden from your page and goals.
                      </div>
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid xs={4} sm={4} md={4}>
                    <p className='input-label'> Patronage visibility </p>
                  </Grid>
                  <Grid xs={8} sm={8} md={8}>
                    <RadioGroup
                      aria-label='role'
                      defaultValue='is'
                      name='radio-buttons-group'
                    >
                      <FormControlLabel
                        value='is'
                        control={<Radio sx={{ fontWeight: 'bold' }} />}
                        label='Public (recommended)'
                      />
                      <div className='subtitle' style={{ marginLeft: '30px' }}>
                        Anyone who visits your page will see how many patrons
                        you have. We recommend this so that fans know there are
                        others supporting you.
                      </div>
                      <FormControlLabel
                        value='private'
                        control={<Radio sx={{ fontWeight: 'bold' }} />}
                        label='Private'
                      />
                      <div className='subtitle' style={{ marginLeft: '30px' }}>
                        Only you can see how many patrons you have. The number
                        of patrons you have will be hidden from your page and
                        goals
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
                  <Grid xs={12} sm={12} md={12} centered>
                    <p className='input-label'> Local business </p>
                    <div className='subtitle'>
                      Add your address if you want to display your location(s)
                      on your public page and to appear in search results for
                      local businesses.
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: '20px' }}>
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
                        <Grid
                          xs={12}
                          sm={12}
                          md={12}
                          style={{ textAlign: 'center' }}
                        >
                          <Button
                            variant='contained'
                            color='info'
                            style={{
                              borderRadius: '24px',
                              padding: '8px',
                              marginBottom: '8px',
                            }}
                          >
                            Add a business address
                          </Button>
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
                  How to talk about PantPoe to your audience
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
export default PageSetting
