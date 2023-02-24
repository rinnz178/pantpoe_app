import React from 'react'
import styled from 'styled-components'


const Loading = () => {
  return (
    <Wrapper>
      <div className='loader'>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
 
  .loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 25px;
  height: 25px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  align-content: center;
  justifyContent: center;
  margin: 0 auto;
  padding: 0 auto
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default Loading
