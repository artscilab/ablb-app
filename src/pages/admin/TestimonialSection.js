import React, { useState, useEffect } from 'react';
import request from '../../utils/requests';
import { ActionButton, ABLBSelect } from '../../components/common';
import { 
  Section,
  SectionContent,
  SectionHeader,
  SectionBody,
  SectionEditor } from '../../components/admin/common';
import TestimonialEditor from '../../components/admin/TestimonialEditor';

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState(null);
  const [showTestimonialEditor, setShowTestimonialEditor] = useState(false);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const testimonialReq = await request.get("/testimonials");
        
        setTestimonials(testimonialReq.data)
      } catch (e) {
        console.log("failed to get testimonials")
      } 
    }

    getTestimonials();
  }, [])

  return (
    <Section>
      <SectionContent>
        <SectionHeader>Testimonials</SectionHeader>
        <SectionBody>
        {testimonials ? (
          <ABLBSelect 
            options={testimonials} 
            getOptionLabel={t => t.name} 
            getOptionValue={t => t.id}></ABLBSelect>
          ) : <p>No testimonials created.</p>}
        </SectionBody>
        <ActionButton onClick={() => setShowTestimonialEditor(true)}>Add Testimonial</ActionButton>
      </SectionContent>
      {showTestimonialEditor && (
        <SectionEditor>
          <TestimonialEditor></TestimonialEditor>
        </SectionEditor>
      )}
    </Section>
  )
}

export default TestimonialSection;