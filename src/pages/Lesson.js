import React, { useState, useEffect } from 'react';
import { PageHeader, PageContent } from '../components/common';
import { useParams } from 'react-router-dom';
import request from '../utils/requests';

const Lesson = () => {
  const { id } = useParams();
  const [lesson, setLessonData] = useState(null);
  const [videoParts, setVideoParts] = useState(null);

  useEffect(() => {
    const getLesson = async () => {
      let r = await request.get(`/lessons/${id}?include`)
      setLessonData(r.data);
    }

    getLesson();
  }, [id])

  return (
    <div>
      {lesson === null 
        ? <PageHeader>Loading</PageHeader> 
        : 
        <>
          <PageHeader>{lesson.title}</PageHeader>
          <PageContent>
            <p>{lesson.description}</p>
          </PageContent>
        </>
      }
    </div>
  )
}

export default Lesson;