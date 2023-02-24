import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CustomButton } from '../layout/CutomerButton'
import { TextField, Box, Button } from '@mui/material'
import GoogleLogin from 'react-google-login'
import { useGlobalContext } from '../context/context'

const Login = () => {
  const { saveToken, setUser } = useGlobalContext()

  const [bearToken, setBearToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let formData = {
    email: 'admin@gmail.com',
    password: 'admin',
    role: '1',
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data
        if (data.status === 'Active') {
          setBearToken(data.access_token)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = {
      email: email,
      password: password,
    }
    fetch('http://localhost:8000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data
        if (data.status === 'Active') {
          saveToken(data.access_token)
          setUser(data)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Wrapper>
      <div>
        <h2>Log in</h2>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <Box className='form-control'>
              <label htmlFor='email'>Email</label>
              <TextField
                id='email'
                type='email'
                className='input-field'
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box className='form-control'>
              <label htmlFor='password'>Password</label>
              <TextField
                id='password'
                type='password'
                className='input-field'
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Box>
              <a href='/'>Forget password</a>
            </Box>

            <Button type='submit' fullWidth className='btn btn-filled'>
              Log in
            </Button>
          </form>
          <div className='line'>
            <div className='liner'></div>
            <div className='linerSec'>
              <p>or</p>
            </div>
            <div className='liner'></div>
          </div>

          <GoogleLogin
            clientId='37192225670-f4gb7ohcfij72kvu5mfn5qtbque098q8.apps.googleusercontent.com'
            render={(renderProps) => (
              <div
                className='btn'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Continue with Google
              </div>
            )}
            // onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
          />

          <div className='btn'>Continue with Facebook</div>
        </div>
        <p style={{ textAlign: 'center' }}>
          New to PantPoe? <a>Sign Up</a>
        </p>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
    border: 1px solid rgb(229, 227, 221);
    border-radius: 4px;
    height: auto;
    padding: 20px;
  }
  img {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 50px;
    border: 1px solid rgb(195 197 194);
    color: 'white';
    height: 48px;
    padding: 0px 30px;
    text-transform: capitalize;
    margin: 6px 0px;
  }
  .btn-filled {
    background: rgb(245, 244, 242);
    color: #333333bd;
    border: 0px;
  }
  .line {
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    vertical-align: middle;
    padding: 0.5rem 0rem 0rem;
    margin: 0rem;
  }
  .liner {
    box-sizing: border-box;
    -webkit-box-flex: 1;
    flex-grow: 1;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    padding: 0rem;
    margin: 0rem;
    border-bottom: 1px solid #fff;
  }
  .linerSec {
    box-sizing: border-box;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    padding: 0rem 0.5rem;
    margin: 0rem;
  }
  .linerSec p {
    color: rgb(112, 108, 100);
    font-family: aktiv-grotesk, sans-serif;
    position: relative;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    text-align: center;
    font-weight: 400 !important;
    margin: 0.5rem 0rem !important;
    font-size: 1rem !important;
    line-height: 1.5 !important;
  }
  .form-control {
    text-align: start;
    padding: 10px 0px;
  }
  .form-control label {
    color: #333333bd;
  }
  .form-control .input-field {
    margin: 0.5rem 0px;
    background: rgb(245, 244, 242);
  }
`
export default Login
