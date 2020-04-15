import React, { useState, useEffect } from 'react';
import request from '../utils/requests';
import { PageHeader } from '../components/common';

const Catalog = () => {
  const [lessons, setLessons] = useState(null)

  useEffect(() => {
    const getLessons = async () => {
      const lessonReq = await request.get("lessons/");
      console.log(lessonReq);
      
      if (lessonReq.status === 200) {
        setLessons(lessonReq.data)
      }
    };

    getLessons()
  }, [])

  return (
    <div>
      <PageHeader>ABLB Catalog</PageHeader>
      
      {lessons && lessons.map((lesson) => (
        <div key={lesson.id}>
          <h2>{lesson.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default Catalog;