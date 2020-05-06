import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  div {
    margin: 0 15px;
    flex: 1;
  }
`

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <p>This is an <a href="https://artscilab.atec.io">ArtSciLab</a> project.</p>
      </div>
      <div>
        <p>Insert some other text here as necessary. </p>
      </div>
    </FooterContainer>
  )
}

export default Footer;