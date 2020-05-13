import React from 'react'
import styled from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 35px;
  justify-content: center;
`

const Spinner = () => {
  return (
    <SpinnerContainer>
      <BarLoader width={200} color="#0dbf7b" height={5}></BarLoader>
    </SpinnerContainer>
  )
}

export default Spinner;