import React from 'react';
import styled from 'styled-components'

const CandyStripe = styled.div`
  height: 15px;
  background-color: ${props => props.theme.green};
  background: repeating-linear-gradient(
    45deg,
    ${props=>props.theme.green},
    ${props=>props.theme.green} 10px,
    ${props=>props.theme.darkGray} 10px,
    ${props=>props.theme.darkGray} 20px,
    ${props=>props.theme.yellow} 20px,
    ${props=>props.theme.yellow} 30px,
    ${props=>props.theme.darkGray} 30px,
    ${props=>props.theme.darkGray} 40px,
    ${props=>props.theme.red} 40px,
    ${props=>props.theme.red} 50px,
    ${props=>props.theme.darkGray} 50px,
    ${props=>props.theme.darkGray} 60px
  );
`

export default CandyStripe;