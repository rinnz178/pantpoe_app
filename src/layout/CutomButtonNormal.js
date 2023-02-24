import Button from '@mui/material/Button'

import { styled } from '@mui/styles'

export const CustomButtonNormal = styled('button')(({ theme }) => ({
  background: 'rgb(51,149,255)',
  background:
    'linear-gradient(0deg, rgba(51,149,255,1) 0%, rgba(3,224,255,1) 100%)',
  borderRadius: '50px',
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  [theme.breakpoints.down('md')]: {
    height: 36,
    padding: '0 20px',
  },
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  textTransform: 'capitalize',
  '&:hover': {
    cursor: 'pointer',
  },
}))
