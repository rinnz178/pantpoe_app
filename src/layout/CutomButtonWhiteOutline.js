import Button from '@mui/material/Button'

import { styled } from '@mui/styles'

export const CutomButtonWhiteOutline = styled('button')(({ theme }) => ({
  background: 'white',
  border: 'rgb(51, 149, 255) 1px solid',
  borderRadius: '50px',
  color: 'black',
  height: 48,
  padding: '0px 30px',
  textTransform: 'capitalize',
  '&:hover': {
    cursor: 'pointer',
  },
  [theme.breakpoints.down('md')]: {
    height: '36px',
    padding: '0 20px',
  },
}))
