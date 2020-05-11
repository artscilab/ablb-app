import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import CandyStripe from './CandyStripe';

const PageHeaderText = styled.h1`
  font-size: 50px;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({theme}) => theme.brandon};
`

export const PageHeaderContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`

export const PageContent = styled.div`
  width: 1000px;
  margin: 50px auto;
`

export const PageHeader = (props) => {
  return (
    <PageHeaderContainer>
      <PageHeaderText>
        {props.children}
      </PageHeaderText>
      <CandyStripe></CandyStripe>
    </PageHeaderContainer>
  )  
}

export const PageDescription = styled.p`
  font-size: 35px;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({theme}) => theme.brandon};
  margin-bottom: 25px;
`

export const ActionButton = styled.button`
  padding: 10px 15px;
  outline: none;
  transition: all .2s ease;
  font-size: 18px;
  font-family: ${({theme}) => theme.brandon};
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  color: ${({theme, inverted}) => inverted ? theme.green : theme.black};
  background: ${({theme, inverted}) => inverted ? "transparent" : theme.green};
  border: 2px solid ${({theme, inverted}) => theme.green};
  
  &:hover {
    background: ${({theme}) => theme.black};
    border: 2px solid ${({theme}) => theme.green};
    color: ${({theme, inverted}) => theme.green};
  }

  &:disabled {
    background: ${({theme}) => theme.darkGray};
    color: ${({theme, inverted}) => theme.white};
    border: 2px solid transparent;

    &:hover {
      background: ${({theme}) => theme.darkGray};
      color: ${({theme, inverted}) => theme.white};
      cursor: not-allowed;
    }
  }
`

export const TextInput = styled.input`
  padding: 10px 15px 10px 15px;
  background: none;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({theme}) => theme.green};
  color: ${({theme}) => theme.white};
  transition: all .2s ease;
  font-size: 20px;
  line-height: 24px;
  font-family: ${({theme}) => theme.brandon};
  background: ${({theme}) => theme.transparentBg};
`

export const TextArea = styled.textarea`
  min-height: 100px;
  resize: vertical;
  padding: 10px 15px 10px 15px;
  background: none;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({theme}) => theme.green};
  color: ${({theme}) => theme.white};
  transition: all .2s ease;
  font-size: 20px;
  font-family: ${({theme}) => theme.brandon};
  background: rgba(100, 100, 120, 0.3);
`

export const ABLBSelect = (props) => (
  <Select 
    isClearable={true}
    styles={{
      control: (styles) => {
        return { 
          ...styles, 
          backgroundColor: 'rgba(100, 100, 120, 0.3)', 
          border: "none",
          borderBottom: "2px solid #0dbf7b",
          borderRadius: 0,
          outline: "none",
          color: "#fff"
        }
      },
      valueContainer: styles => {
        return {
          ...styles,
          height: "38px"
        } 
      },
      input: styles => {
        return {
          ...styles,
          color: "#fff",
        }
      },
      menu: styles => {
        return {
          ...styles,
          backgroundColor: "#141C26" 
        }
      },
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: isSelected ? "black" : "white",
          backgroundColor: isSelected ? "#0dbf7b" : "transparent",
          transition: "all .2s ease",
          ":hover": {
            ...styles[":hover"],
            backgroundColor: "rgba(13,191,123, 0.5)",
            cursor: "pointer"
          }
        }
      },
      singleValue: (styles) => {
        return {
          ...styles,
          color: "#fff"
        }
      }
    }}
    {...props}></Select>
)

export const ErrorMessage = styled.p`
  padding: 10px 15px;
  
  border: 2px solid ${({theme}) => theme.black};
  border-color: ${({theme}) => theme.red};
`

export const AdminForm = styled.form`
  ${TextInput}, button  {
    margin-bottom: 15px;
    width: 100%;
  }

  ${ErrorMessage} {
    font-size: 16px;
    margin-bottom: 15px;
    margin-left: 0;
    margin-left: 25px;
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  
  ${TextInput}, button, p {
    margin-bottom: 25px;
  }
  
  .message {
  }
  
  ${ErrorMessage} {
    font-size: 16px;
    margin-bottom: 25px;
    margin-left: 0;
  }

  max-width: 500px;
`