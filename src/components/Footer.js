import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
`

const Footer = () => {
  return (
    <FooterContainer>
      
    </FooterContainer>
  )
}

export default Footer;