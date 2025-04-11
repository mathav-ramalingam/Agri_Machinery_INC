import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "/images/image6.jpg";
import img1 from "/images/image7.jpg";

const MainSection = () => {
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image5.jpg",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <>
      {/* Full-Screen Image Slider */}
      <div className="w-full h-[50vh] md:h-[75vh] lg:h-[75vh] overflow-hidden">
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index} className="w-full h-[50vh] md:h-[75vh] lg:h-screen">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-32 py-12 md:py-16 gap-8">
        {/* Left: Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-green-700">
            Welcome to AGRI Machinery
          </h2>
          <p className="text-lg md:text-xl italic mt-4 font-semibold">
            - Your Trusted Partner in Agricultural Machinery!
          </p>
          <p className="mt-6 text-gray-700 text-base md:text-lg">
            We provide high-quality, reliable, and efficient agricultural machinery to help 
            farmers maximize productivity and minimize effort. Whether you're a small-scale 
            farmer or managing large agricultural operations, our advanced farming solutions 
            are designed to meet all your needs.
          </p>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/3 w-full">
          <img
            src={img1}
            className="w-full h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg"
            alt="AGRI Machinery"
          />
        </div>
      </div>

      {/* Quote Section */}
      <div className="w-full bg-black py-10 px-6 flex items-center justify-center text-center">
        <h1 className="text-white text-lg md:text-2xl lg:text-3xl font-bold">
          Revolutionizing Agriculture with Reliable Machinery & Expert Service!
        </h1>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between px-6 md:px-12 lg:px-32 py-12 md:py-16 gap-8">
        {/* Right: Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-green-700">
            About Us
          </h2>
          <p className="mt-6 text-gray-700 text-base md:text-lg">
            We specialize in high-quality farming solutions that empower farmers with 
            efficiency and productivity. Our mission is to transform agriculture with 
            state-of-the-art machinery that meets global standards.
          </p>
        </div>

        {/* Left: Image */}
        <div className="md:w-1/3 w-full rounded-lg overflow-hidden">
          <img
            src={img}
            className="w-full h-[400px] md:h-[400px] lg:h-[400px] object-cover rounded-lg shadow-lg"
            alt="About AGRI Machinery"
          />
        </div>
      </div>
    </>
  );
};

export default MainSection;
