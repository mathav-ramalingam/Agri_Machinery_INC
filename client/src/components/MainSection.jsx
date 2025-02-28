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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      {/* Full-Screen Image Slider */}
      <div className="w-screen h-screen overflow-hidden ">
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index} className="w-screen h-screen">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* First Text-Image Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-32 gap-12">
        {/* Left: Text Content */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-5xl font-bold text-green-700 font-noto">
            Welcome to AGRI Machinery
          </h2>
          <p className="text-xl italic mt-4 font-lg font-semibold">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Your Trusted Partner in Agricultural Machinery!
          </p>
          <p className="mt-8 text-gray-700 text-2xl font-libre">
            We are committed to providing high-quality, reliable, and efficient
            agricultural machinery to help farmers maximize productivity and
            minimize effort. Whether you're a small-scale farmer or managing
            large agricultural operations, our advanced farming solutions are
            designed to meet all your needs.
          </p>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/3 rounded-lg overflow-hidden">
          <img
            src={img1}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
            alt="AGRI Machinery"
          />
        </div>
      </div>

      {/* Quote Section */}
      <div className="w-full bg-black py-14 px-10 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold font-agri">
          Revolutionizing Agriculture with Reliable Machinery & Expert Service!
        </h1>
      </div>

      {/* About Us Section (Below Quote) */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between p-24 gap-12">
        {/* Right: Text Content */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-5xl font-bold text-green-700 font-noto">
            About Us
          </h2>
          <p className="mt-8 text-gray-700 text-2xl font-libre">
            We specialize in high-quality farming solutions that empower farmers 
            with efficiency and productivity. Our mission is to transform agriculture 
            with state-of-the-art machinery that meets global standards.
          </p>
        </div>

        {/* Left: Image */}
        <div className="md:w-1/3 rounded-lg overflow-hidden">
          <img
            src={img}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
            alt="About AGRI Machinery"
          />
        </div>
      </div>
    </>
  );
};

export default MainSection;
