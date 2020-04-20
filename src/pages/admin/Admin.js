import React from 'react'
import { PageHeader } from '../../components/common'
import TestimonialSection from './TestimonialSection';
import LessonSection from './LessonSection';
import VideoSection from './VideoSection';
import UserSection from './UserSection';


const Admin = () => {
  return (
    <div>
      <PageHeader>Admin</PageHeader>
      <TestimonialSection></TestimonialSection>
      <LessonSection></LessonSection>
      <VideoSection></VideoSection>
      <UserSection></UserSection>
    </div>
  )
}

export default Admin;