import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

export const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing((props) => props.padding),
  // margin: theme.spacing((props) => props.margin),

  paddingLeft: theme.spacing(1),
  marginLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  marginRight: theme.spacing(1),

  paddingTop: theme.spacing(1),
  marginTop: theme.spacing((props) => props.marginTop),
  paddingBottom: theme.spacing(0),
  marginBottom: theme.spacing(0),

  textAlign: (props) => props.align,
  color: theme.palette.text.secondary,
}))
