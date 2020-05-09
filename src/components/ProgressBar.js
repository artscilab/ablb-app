import React from 'react';
import styled from 'styled-components';

const Progress = styled.div`
  width: ${props => props.percentage}%;
  background-color: ${props => props.theme.green};
  height: 100%;
  position: relative;
  text-align: center;
`

const Bar = styled.div`
  height: 20px;
  background-color: ${props => props.theme.transparentBg};
  width: 100%;
  margin: 15px 0;
`

const ProgressBar = (props) => {
  return (
    <Bar>
      <Progress percentage={props.percentage}></Progress>
    </Bar>
  )
}

export default ProgressBar;