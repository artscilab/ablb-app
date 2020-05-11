import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  width: 100%;
  padding: 50px;
  
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 1000px;
    margin: 0 auto;
  
    > div {
      margin: 0 25px;
      flex: 1;

      p, p a {
        margin-bottom: 15px;
        font-size: 20px; 
      }
    }
  }
`

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <div>
          <p>Arts-Based Learning for Business is a joint project between the School of Arts and Hmanities and the Jindal School of Business at UT Dallas.  This project was partially funded by the Center of Teaching and Learning.</p>
        </div>
        <div>
          <p>This is an <a href="https://artscilab.atec.io">ArtSciLab</a> project.</p>
          <p>This project is open source! Check out the code <a href="https://github.com/artscilab/ablb-app">here.</a></p>
        </div>
      </div>
    </FooterContainer>
  )
}

export default Footer;