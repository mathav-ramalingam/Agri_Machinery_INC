import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainSection = () => {
  const images = [
    "./images/image1.jpg",
    "./images/image2.jpg",
    "./images/image3.jpg",
    "./images/image4.jpg",
    "./images/image5.jpg",
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
    <main className="flex flex-col md:flex-row items-center justify-center p-32 gap-32">
      {/* Image Slider */}
      <div className="w-3/4 md:w-1/3 rounded-lg overflow-hidden">
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Text Content */}
      <div className="text-center md:text-left">
        <h2 className="text-5xl font-bold text-green-700 font-noto">
          Welcome to AGRI Machinery
        </h2>
        <p className="text-xl italic mt-4 font-lg font-semibold">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Your Trusted Partner in Agricultural Machinery!
        </p>
        <p className="mt-8 text-gray-700 max-w-2xl pl-12 text-2xl font-libre">
          We are committed to providing high-quality, reliable, and efficient agricultural
          machinery to help farmers maximize productivity and minimize effort. Whether you're
          a small-scale farmer or managing large agricultural operations, our advanced farming
          solutions are designed to meet all your needs.
        </p>
      </div>
    </main>
  );
};

export default MainSection;
