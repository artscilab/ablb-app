import React, { useEffect, useState } from 'react';
import { PageHeader, PageContent } from '../components/common';
import request from '../utils/requests';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../components/Spinner';

const PeopleContainer = styled.div`

`

const Person = styled.div `
  background: ${props => props.theme.transparentBg};
  padding: 25px;
  box-shadow: 0 0 0 0 ${props => props.theme.boxShadowColor};
  flex: 1;
  margin: 10px;
  
  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 15px;
  }

  .bio {
    margin: 10px 0;
  }
`

const PersonList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
`

const About = () => {
  const [aboutPageContent, setAboutPageContent] = useState("<p>Loading</p>")
  const [people, setPeople] = useState(null)
  const history = useHistory();

  useEffect(() => {
    const getAboutPageContents = async () => {
      try {
        let r = await request.get("/about")
        setAboutPageContent(r.data.content)
      } catch (e) {
        history.push("/404")
      }
    }

    getAboutPageContents();
  }, [history])

  useEffect(() => {
    const getPeople = async () => {
      try {
        let r = await request.get("/people")
        setPeople(r.data)
      } catch (e) {
        console.log("Unable to get people")
      }
    }

    getPeople()
  }, [])

  return (
    <div>
      <PageHeader>About</PageHeader>
      <PageContent>
        <div dangerouslySetInnerHTML={{__html: aboutPageContent}}>
        </div>
        <PeopleContainer>
          <h1>People</h1>
          <PersonList>
            {people && people.length > 0 ? people.map((p) => (
              <Person>
                {p.imageurl && (
                  <div>
                    <img src={p.imageurl}></img>
                  </div>
                )}

                <h2>{p.name}</h2>
                {p.school && (
                  <h3>{p.school}</h3>
                )}

                {p.personalLink && (
                  <a target="_blank" rel="noopener noreferrer" href={p.personalLink}>{p.personalLink.substring(0, 50)}</a>
                )}

                <p class="bio">{p.bio}</p>
              </Person>
            )) : <Spinner></Spinner>}
          </PersonList>
        </PeopleContainer>
      </PageContent>
    </div>
  )
}

export default About;