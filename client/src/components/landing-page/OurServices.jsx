import React from 'react';
import {
  FaConciergeBell,
  FaShuttleVan,
  FaSpa,
  FaUtensils,
  FaSwimmer,
  FaWifi,
} from 'react-icons/fa';
import { LandingHeader } from '../../ui/Headings';

const services = [
  {
    icon: <FaConciergeBell size={40} className="text-blue-500" />,
    title: 'Concierge Service',
    description:
      'Our concierge team is here to help you with reservations, recommendations, and any other needs during your stay.',
  },

  {
    icon: <FaSwimmer size={40} className="text-blue-500" />,
    title: 'Swimming Pool',
    description:
      'Take a dip in our luxurious swimming pool, open year-round for your enjoyment.',
  },
  {
    icon: <FaWifi size={40} className="text-blue-500" />,
    title: 'Free WiFi',
    description:
      'Stay connected with our complimentary high-speed WiFi available throughout the hotel.',
  },
];

const OurServices = () => {
  return (
    <div className="py-10">
      <LandingHeader >Our Services</LandingHeader>
      <div className="flex flex-wrap justify-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 m-4 rounded-lg shadow-md w-96 flex flex-col items-center"
          >
            {service.icon}
            <h3 className="text-2xl  text-center font-semibold mt-4 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-700 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
