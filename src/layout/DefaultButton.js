import Button from '@mui/material/Button'

import { withStyles } from '@mui/styles'

export const DefaultBtn = withStyles((theme) => ({
  root: {
    background: (props) => (props.bgcolor ? props.bgcolor : 'rgb(51,149,255)'),
    background: (props) =>
      props.bgcolor
        ? props.bgcolor
        : 'linear-gradient(0deg, rgba(51,149,255,1) 0%, rgba(3,224,255,1) 100%)',
    borderRadius: '50px',
    border: 0,
    color: 'white',
    height: 48,
    marginTop: '18px',
    padding: '20px 30px',
    [theme.breakpoints.down('md')]: {
      height: 28,
      padding: '20px 20px',
    },
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  label: {
    textTransform: 'capitalize',
    fontSize: '1.072rem',
  },
}))((props) => <Button {...props} />)
