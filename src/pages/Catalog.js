import React, { useState, useEffect } from 'react';
import request from '../utils/requests';
import { PageHeader, PageContent } from '../components/common';
import styled from 'styled-components';
import { chunk } from '../utils';
import { Link } from 'react-router-dom';

const LessonTitle = styled.h2`
  margin-bottom: 15px;
`

const CatalogRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px auto;
  justify-content: flex-start;
`

const CatalogItem = styled(Link)`
  display: block;
  flex: 1;
  max-width: 475px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.theme.transparentBg};
  padding: 25px;
  color: ${props => props.theme.white};
  text-decoration: none;
  box-shadow: 0 0 0 0 ${props => props.theme.boxShadowColor};
  border: 3px solid transparent;
  
  &:first-child {
    margin-right: 50px;
  }
  
  p {
    flex: 1;
  }
  
  &:hover {
    border: 3px solid ${props => props.theme.green};
    color: ${props => props.theme.white};
    cursor: pointer;
    box-shadow: 0 0 35px 0 ${props => props.theme.boxShadowColor};
  }

  &:visited {
    color: ${props => props.theme.white}
  }
`

const Catalog = () => {
  const [lessons, setLessons] = useState(null)

  useEffect(() => {
    const getLessons = async () => {
      const lessonReq = await request.get("lessons/");
      
      if (lessonReq.status === 200) {
        setLessons(chunk(lessonReq.data, 2))
      }
    };

    getLessons()
  }, [])

  return (
    <div>
      <PageHeader>ABLB Catalog</PageHeader>
      <PageContent>
          <p className="lead">All lessons are available freely. In order to watch the videos, make an account now!</p>
          {lessons && lessons.map((lessonRow) => (
            <CatalogRow key={lessonRow[0].id}>
              {lessonRow.map((lesson) => (
                <CatalogItem to={`/catalog/${lesson.id}`} key={lesson.id}>
                  <LessonTitle>{lesson.title}</LessonTitle>
                  <p>
                    {lesson.description.substring(0, 100)}{lesson.description.length > 100 && "..."}
                  </p>
                </CatalogItem>
              ))}
            </CatalogRow>
          ))}
      </PageContent>
    </div>
  )
}

export default Catalog;