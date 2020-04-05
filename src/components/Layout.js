import React from 'react';
import styled from 'styled-components'

const LayoutContainer = styled.div`
  background: ${({theme}) => theme.darkGray};
  padding: 15px 50px;
  color: ${({theme}) => theme.white};
  min-height: 100%;
`

const Layout = ({children}) => {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  )
}

export default Layout;