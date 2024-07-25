import React from 'react';
import { LandingHeader } from '../../ui/Headings';

const testimonials = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/100',
    feedback:
      'This hotel is amazing! The staff were so friendly and the rooms were clean and comfortable.',
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/100',
    feedback:
      'A fantastic stay! The amenities were top-notch and the location was perfect for our vacation.',
  },
  {
    name: 'Samuel Lee',
    image: 'https://via.placeholder.com/100',
    feedback:
      'Highly recommend this hotel. Great service, beautiful rooms, and excellent food.',
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-10">
      <LandingHeader>Testimonials</LandingHeader>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className=" p-6 m-4 rounded-lg shadow-md w-96 flex flex-col items-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="rounded-full mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">{testimonial.name}</h3>
            <p className="text-gray-700 text-center">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
