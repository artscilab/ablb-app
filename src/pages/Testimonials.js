import React, { useState, useEffect } from 'react'
import { PageHeader, PageContent } from '../components/common';
import request from '../utils/requests';
import { chunk } from '../utils'
import { 
  TestimonialBox, 
  TestimonialContainer, 
  TestimonialName,
  TestimonialText } from '../components/testimonials'
import Spinner from '../components/Spinner';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonialsReq = await request.get("testimonials");
      
      if (testimonialsReq.status === 200) {
        setTestimonials(chunk(testimonialsReq.data, 2))
      }
    };

    getTestimonials()
  }, [])

  return (
    <div>
      <PageHeader>Testimonials</PageHeader>
      <PageContent>
        {!testimonials ? <Spinner></Spinner>
        : (
          <>
            {testimonials.map((tRow, i) => (
              <TestimonialContainer key={i}>
                {tRow.map((t) => (
                  <TestimonialBox key={t.id}>
                    <TestimonialText>{t.text}</TestimonialText>
                    <TestimonialName>{t.name}, {t.school}</TestimonialName>
                  </TestimonialBox>
                ))}
              </TestimonialContainer>
            ))}
          </>
        )
        }
      </PageContent>
    </div>
  )

}

export default Testimonials;