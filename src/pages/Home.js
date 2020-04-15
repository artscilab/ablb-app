import React, { useState, useEffect } from 'react';
import { PageHeader, PageDescription } from '../components/common';
import styled from 'styled-components';
import request from '../utils/requests';

const TestimonialBox = styled.div`
  padding: 15px;
  background-color: ${({theme}) => theme.green};

`
const Home = () => {
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonials = await request.get("/testimonials");
      if (testimonials.status === 200) {
        console.log(testimonials);
        if (testimonials.data.length > 0) {
          setTestimonials(testimonials.data)
        }
      }
    }

    getTestimonials();
  }, [])

  return (
    <div>
      <PageHeader>ABLB</PageHeader>
      <div className="home-header">
        <PageDescription>Arts-Based Learning in Business</PageDescription>
        <p>This is a description</p>
      </div>
      {testimonials && (
        <TestimonialBox>
          <p>{testimonials[0].text}</p>
          <p>{testimonials[0].name}</p>
        </TestimonialBox>
      )}
    </div>
  )
}
export default Home;