import styled from 'styled-components';

export const TestimonialContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 15px;
  margin: 0 -15px 15px -15px;
`

export const TestimonialName = styled.p`
  font-size: 20px;
  font-style: italic;
  font-weight: 300;
`

export const TestimonialText = styled.p`
  font-size: 22px;
  flex: 1;
`

export const TestimonialBox = styled.div`
  padding: 25px;
  border: 2px solid ${({theme}) => theme.green};
  width: 500px;
  margin: 35px 15px;
  display: flex;
  flex-direction: column;

  ${TestimonialName} {
    text-align: right;
  }
  ${TestimonialText} {
    text-align: left;
    margin-bottom: 15px;
  }
`