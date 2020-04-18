import styled from 'styled-components'

export const SectionHeader = styled.h2`
  font-family: ${({theme}) => theme.brandon};
  font-size: 35px;
  margin-bottom: 15px;
`

export const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1000px;
  padding: 25px;
  background: ${props => props.theme.transparentBg};
  margin-bottom: 50px;
`

export const SectionContent = styled.div`
  margin-right: 25px;  
`

export const SectionBody = styled.div`
  margin-bottom: 25px;
  margin-right: 15px;
  width: 500px;
  p {
    margin-bottom: 15px;
  }
`

export const SectionEditor = styled.div`
  flex: 1;

  form {
    width: 100%;
  }

  input[type="text"], input[type="email"], textarea, button {
    width: 100%;
    margin-bottom: 15px;
  }
`
