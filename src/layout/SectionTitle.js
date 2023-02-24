import { Typography } from '@mui/material'
import { makeStyles } from '@mui/material/styles'

const Sectiontitle = (props) => {
  const { label, color } = props

  return (
    <Typography variant='h4' style={{ color: '#000', fontWeight: '600' }}>
      {label}
    </Typography>
  )
}

export default Sectiontitle
