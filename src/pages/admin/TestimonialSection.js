import React, { useState } from 'react';
import { useResource } from '../../utils/requests';
import { ABLBSelect, TextInput, TextArea } from '../../components/common';
import { 
  Section,
  SectionContent,
  SectionHeader,
  SectionBody,
  SectionEditor } from '../../components/admin/common';
import Editor from '../../components/admin/editor';
import Checkbox from '../../components/Checkbox';
import * as Yup from 'yup';

const TestimonialSection = () => {
  const testimonials = useResource("testimonials");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <Section>
      <SectionContent>
        <SectionHeader>Testimonials</SectionHeader>
        <SectionBody>
          <p>Select testimonial to edit</p>

          {testimonials && (
            <ABLBSelect 
              options={testimonials} 
              getOptionLabel={t => t.name} 
              getOptionValue={t => t.id}
              onChange={t => setSelectedTestimonial(t)}
              ></ABLBSelect>
            )}
        </SectionBody>
      </SectionContent>
      
      <SectionEditor>
        <Editor
          resourceName="testimonial"
          apiPath="testimonials"
          validationSchema={
            Yup.object().shape({
              name: Yup.string().min(2, "Name too short").required("Name is required!"),
              text: Yup.string().min(2, "Text too short").required("Testimonial text is required!"),
              school: Yup.string().min(2, "School name too short").required("School name is required!"),
            })
          }
          selected={selectedTestimonial}
          fields={[
            {
              component: TextInput,
              type: "text",
              name: "name",
              placeholder: "Display Name",
              initialValue: ""
            },
            {
              component: TextInput,
              type: "text",
              name: "school",
              placeholder: "School",
              initialValue: ""
            },
            {
              component: TextArea,
              name: "text",
              placeholder: "Testimonial text",
              initialValue: ""
            },
            {
              component: Checkbox,
              name: "featured",
              initialValue: false,
              label: "Featured on homepage?"
            }
          ]}/>
      </SectionEditor>
    </Section>
  )
}

export default TestimonialSection;