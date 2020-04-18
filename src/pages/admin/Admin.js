import React from 'react'
import { PageHeader } from '../../components/common'
import TestimonialSection from './TestimonialSection';
import LessonSection from './LessonSection';
import VideoSection from './VideoSection';


const Admin = () => {
  return (
    <div>
      <PageHeader>Admin</PageHeader>
      <TestimonialSection></TestimonialSection>
      <LessonSection></LessonSection>
      <VideoSection></VideoSection>
    </div>
  )
}

export default Admin;