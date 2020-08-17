import React from 'react'
import { PageHeader, PageContent } from '../../components/common'
import TestimonialSection from './TestimonialSection';
import LessonSection from './LessonSection';
import VideoSection from './VideoSection';
import UserSection from './UserSection';
import PersonSection from './PersonSection';
import AboutSection from './AboutSection';


const Admin = () => {
  return (
    <div>
      <PageHeader>Admin</PageHeader>
      <PageContent>
        <TestimonialSection></TestimonialSection>
        <LessonSection></LessonSection>
        <VideoSection></VideoSection>
        <PersonSection></PersonSection>
        <AboutSection></AboutSection>
        <UserSection></UserSection>
      </PageContent>
    </div>
  )
}

export default Admin;