import React from 'react';
import styled, { css } from 'styled-components';
import { useField } from 'formik'

const Icon = styled.svg`
  fill: none;
  stroke: ${props => props.theme.green};
  stroke-width: 2px;
`

const checkedStyles = css`
  border: 2px solid ${props => props.theme.green};
`
const uncheckedStyles = css`
  border: 2px solid ${props => props.theme.green};
  
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  margin-bottom: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const StyledCheckbox = styled.div`
  display: inline-block;
  cursor: pointer;
  width: 35px;
  height: 35px;
  background: ${props => props.theme.transparentBg};
  transition: all .2s;
  color: ${props => props.theme.white};
  margin-right: 15px;

  ${Icon} {
    transition: all .2s ease;
    opacity: ${props => props.checked ? '1' : '0.3'};
    &:hover {
      opacity: 0.8;
    }
  }

  ${props => props.checked ? checkedStyles : uncheckedStyles};
`

const CheckboxContainer = styled.div`
  margin-bottom: 25px;
  label {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <HiddenCheckbox type="checkbox" {...field} {...props} />
        <StyledCheckbox checked={meta.value}>
          <Icon viewBox="-6 -6 35 35">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
        <p>
          {children}
        </p>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const Checkbox = ({ className, value, ...props }) => (
  <CheckboxContainer className={className}>
    <MyCheckbox name={props.name}>{props.children}</MyCheckbox>
  </CheckboxContainer>
)

export default Checkbox