import styled from 'styled-components'

export const SectionHeader = styled.h2`
  font-family: ${({theme}) => theme.brandon};
  font-size: 35px;
  margin-bottom: 25px;
`

export const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const SectionContent = styled.div`
  margin-right: 25px;  
`

export const SectionBody = styled.div`
  margin-bottom: 25px;
  margin-right: 15px;
  width: 500px;
`

export const SectionEditor = styled.div`
  border: 2px solid ${({theme}) => theme.red};
  width: 400px;
  padding: 30px;
  
  form {
    width: 100%;
  }
  input, textarea, button {
    width: 100%;
    margin-bottom: 15px;
  }
`