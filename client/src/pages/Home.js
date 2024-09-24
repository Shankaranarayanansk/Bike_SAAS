import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, faTools, faClock } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';
import ServiceList from '../components/ServiceList';

const Home = () => {
  const slides = [
    'https://asistosindia.com/images/banners/bike-repair-bangalore.jpg',
    ' https://mybikeclinic.com/img/carousel-bg-2.jpg',
    'https://wallpapers.com/images/featured/4k-bike-p5ztqfie3vnj5kkp.jpg',
  ];

  // Slider settings for React Slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Layout>
      <div className="mb-8">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="h-64 sm:h-96">
              <img
                src={slide}
                alt={`Bike Service ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Bike Service</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <FontAwesomeIcon icon={faBicycle} size="3x" className="text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Expert Bike Care</h2>
          <p>Professional service for all types of bicycles</p>
        </div>
        <div className="text-center">
          <FontAwesomeIcon icon={faTools} size="3x" className="text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Quality Parts</h2>
          <p>We use only high-quality replacement parts</p>
        </div>
        <div className="text-center">
          <FontAwesomeIcon icon={faClock} size="3x" className="text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Quick Turnaround</h2>
          <p>Fast and efficient service to get you back on the road</p>
        </div>
      </div>

      <ServiceList />
    </Layout>
  );
};

export default Home;
