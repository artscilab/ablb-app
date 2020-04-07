import styled from 'styled-components';

export const PageHeader = styled.h1`
  font-size: 50px;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({theme}) => theme.brandon};
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
  background: rgba(100, 100, 120, 0.3);
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  
  input, button, p {
    margin-bottom: 25px;
  }
  .message {
    padding: 10px 15px;
    margin-left: 25px;
    border: 2px solid ${({theme}) => theme.black}
  }
  .error-message {
    border-color: ${({theme}) => theme.red}
  }
  max-width: 500px;
`