import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { TextInput } from './common'

const IconContainer = styled.div`
  width: 35px;
  height: 35px;
  border: 2px solid ${props => props.theme.green};
  background: ${props => props.theme.transparentBg};
  display: inline-block;
`

const Icon = styled.svg`
  fill: none;
  stroke: ${props => props.theme.green};
  stroke-width: 2px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;

  ${TextInput} {
    width: 70px;
    margin: 0 15px;
  }
`

const Label = styled.label`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const NumberChooser = ({ children, ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'number' })
  
  return (
    <Label>
      <Container>
        <IconContainer>
          <Icon viewBox="-3 -6 35 35" onClick={() => {
            if (meta.value > 0) {
              helpers.setValue(meta.value - 1)
            }
          }}>
            <rect
            height='1' rx='1' width='17' x='6' y='11'>
            </rect>
          </Icon>
        </IconContainer>
        <TextInput type="number" {...field} {...props}></TextInput>
        <IconContainer>
          <Icon viewBox="-3 -3 35 35" onClick={() => {
            helpers.setValue(meta.value + 1)
          }}>
            <rect
              height='1' rx='1' width='17' x='6' y='14'></rect>
            <rect
              height='17' rx='1' width='1' x='14' y='6'></rect>
          </Icon>
        </IconContainer>
      </Container>
      <p>{children}</p>
    </Label>
  )
}

export default NumberChooser;
