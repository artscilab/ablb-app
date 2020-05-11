import React, { useState, useEffect, useContext } from 'react';
import { PageContent, ActionButton } from '../components/common';
import styled from 'styled-components';
import request from '../utils/requests';
import CandyStripe from '../components/CandyStripe';
import ReactPlayer from 'react-player';
import {useHistory, Link} from 'react-router-dom';
import { SessionContext } from '../utils/session';

const TestimonialContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 15px;
`

const TestimonialName = styled.p`
  font-size: 20px;
  font-style: italic;
  font-weight: 300;
`

const TestimonialText = styled.p`
  font-size: 22px;
  flex: 1;
`

const TestimonialBox = styled.div`
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

const JumbotronDescription = styled.div`
  flex: 1;

  p {
    margin-bottom: 15px;
  }
`

const HomeJumbotron = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px auto;
  align-items: flex-start;
  
  img {
    max-width: 250px;
    margin-right: 35px;
  }

  h1 {
    margin-top: 0;
  }

  ${CandyStripe} {
    margin: 0 0 25px 0;
  }
`

const IntroVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;

  h1 {
    margin-bottom: 35px;
  }
`

const CallToAction = styled.div`
  margin: 100px 0 15px 0;

  p.lead {
    margin-bottom: 35px;
  }

  ${ActionButton} {
    margin: 0 auto;
    display: block
  }
`

const Home = () => {
  const [featuredTestimonials, setFeaturedTestimonials] = useState(null);
  const history = useHistory()
  const { user } = useContext(SessionContext);

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonials = await request.get("/testimonials?featured=true");
      if (testimonials.status === 200) {
        console.log(testimonials);
        if (testimonials.data.length > 0) {
          setFeaturedTestimonials(testimonials.data)
        }
      }
    }

    getTestimonials() ;
  }, [])

  return (
    <div>
      <PageContent>

        <HomeJumbotron className="home-header">
          <div>
            <img src="./ablb_color.png" alt="ABLB Logo"></img>
          </div>
          <JumbotronDescription>
            <h1>Arts-Based Learning in Business</h1>
            <CandyStripe></CandyStripe>
            <p>Insert some marketing copy here</p>
            {user ? (
              <Link to="/catalog">
                <ActionButton>
                  See Lessons
                </ActionButton>
              </Link>
            ) : (
              <Link to="/signup">
                <ActionButton>
                  Sign up
                </ActionButton>
              </Link>
            )}
          </JumbotronDescription>
        </HomeJumbotron>
        <IntroVideoContainer>
          <h1>Introduction</h1>
          <ReactPlayer 
            width={960}
            height={540}
            url="./introTrailer.mp4" 
            controls 
            playing={false}></ReactPlayer>
        </IntroVideoContainer>
        
        <CallToAction>
          <p className="text-center lead">Get started today!</p>
          <ActionButton onClick={() => history.push("/catalog")}>
            Get Started
          </ActionButton>
        </CallToAction>
        
        {featuredTestimonials && (
          <TestimonialContainer>
            {featuredTestimonials.map((t) => (
              <TestimonialBox key={t.id}>
                <TestimonialText>{t.text}</TestimonialText>
                <TestimonialName>{t.name}, {t.school}</TestimonialName>
              </TestimonialBox>
            ))}
          </TestimonialContainer>
        )}
      </PageContent>
    </div>
  )
}
export default Home;