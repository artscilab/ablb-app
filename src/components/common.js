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
  color: ${({theme}) => theme.black};
  background: ${({theme}) => theme.green};
  border: 2px solid ${({theme}) => theme.green};
  
  &:hover {
    background: ${({theme}) => theme.black};
    border: 2px solid ${({theme}) => theme.green};
    color: ${({theme}) => theme.green};
  }
`

export const TextInput = styled.input`
  padding: 10px 15px 10px 0;
  background: none;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({theme}) => theme.green};
  color: ${({theme}) => theme.white};
  transition: all .2s ease;
  font-size: 20px;
  font-family: ${({theme}) => theme.brandon};
`