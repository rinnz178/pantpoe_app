import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PhoneIcon from '@mui/icons-material/Phone'
import { makeStyles } from '@mui/styles'
import { CButton } from './../../layout/CCButton'
import { display } from '@mui/system'
import { usePostContext } from './../../context/PostContext'

const useStyles = makeStyles((theme) => ({
  cusTab: {
    height: '45vh',
  },
  postDiv: {
    border: 'none',
    width: '100%',
    cursor: 'text',
    height: '250px',
    resize: 'none',
    overflow: 'hidden',
    overflowY: 'auto',
  },
  fileUpload: {
    backgroundColor: 'rgb(251,247,243)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh',
    justifyContent: 'center',
    alignItems: 'center',
    '& input': {
      display: 'none',
    },
  },
  smalltext: {
    color: 'rgb(201,201,196)',
    fontSize: '0.725rem',
    padding: '8px',
  },
  cusTabTools: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridTemplateRows: '20vh',
  },
}))

// fro text upload

function TabPanel(props) {
  const classes = useStyles()
  const { children, value, index, ...other } = props

  return (
    <div
      className={classes.cusTab}
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs(props) {
  const { handleInputImage, handleInputVideo, handleInputAudio } =
    usePostContext()
  const { getImage } = props
  const classes = useStyles()
  const image = React.useRef()
  const audio = React.useRef()
  const video = React.useRef()
  const [post, setPost] = React.useState('')

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleImageChange = (e) => {
    handleInputImage(e.target.files)
    setValue(0)
  }
  const handleVideoChange = (e) => {
    handleInputVideo(e.target.files)
    setValue(0)
  }
  const handleAudioChange = (e) => {
    handleInputAudio(e.target.files)
    setValue(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabPanel value={value} index={0} style={{ display: 'none' }}>
          {/* <textarea
            className={classes.postDiv}
            placeholder="what's on your mind"
            onChange={(e) => handlePost(e.target.value)}
          ></textarea> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box className={classes.fileUpload}>
            <input
              type='file'
              ref={image}
              onChange={handleImageChange}
              accept='image/*'
              name='image[]'
              multiple={true}
            />
            <CButton onClick={() => image.current.click()}>
              Upload photo
            </CButton>
            <span className={classes.smalltext}>Upload photo here!</span>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box className={classes.fileUpload}>
            <input
              type='file'
              ref={video}
              onChange={handleVideoChange}
              accept='video/*'
            />
            <CButton onClick={() => video.current.click()}>
              Upload Video
            </CButton>
            <span className={classes.smalltext}>Most Video up to 20 MB </span>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box className={classes.fileUpload}>
            <input
              type='file'
              ref={audio}
              onChange={handleAudioChange}
              accept='audio/*'
            />
            <CButton onClick={() => audio.current.click()}>
              Upload audio
            </CButton>
            <span className={classes.smalltext}>
              Upload Audio(mp3/mpeg) up to 1MB here!
            </span>
          </Box>
        </TabPanel>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          className={classes.cusTabTools}
        >
          <Tab
            icon={<PhoneIcon />}
            label='Text'
            aria-label='phone'
            {...a11yProps(0)}
          />
          <Tab
            icon={<PhoneIcon />}
            label='image'
            aria-label='phone'
            {...a11yProps(1)}
          />
          <Tab
            icon={<PhoneIcon />}
            label='video'
            aria-label='phone'
            {...a11yProps(2)}
          />
          <Tab
            icon={<PhoneIcon />}
            label='audio'
            aria-label='phone'
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
    </Box>
  )
}
