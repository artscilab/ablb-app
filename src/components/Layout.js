import React from 'react';
import styled from 'styled-components'

const LayoutContainer = styled.div`
  background: ${({theme}) => theme.darkGray};
  color: ${({theme}) => theme.white};
  min-height: 100%;
  padding: 15px;

  @media (min-width: 768px) {
    padding: 15px 50px;
  }
`

const Layout = ({children}) => {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  )
}

export default Layout;