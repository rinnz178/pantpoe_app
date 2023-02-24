import React from 'react'

import styled from 'styled-components'
import { useGlobalContext } from './../context/AuthContext'

function AuthWrapper({ children, ...other }) {
  const { token } = useGlobalContext()
  if (!token) {
    return <div>go to login</div>
  }

  // if (isLoading) {
  //   return (
  //     <Wrapper>
  //       <img src={loadingGif} alt='spinner' />
  //     </Wrapper>
  //   )
  // }

  // if (error) {
  //   return (
  //     <Wrapper>
  //       <h1>{error.message}</h1>
  //     </Wrapper>
  //   )
  // }

  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`

export default AuthWrapper
