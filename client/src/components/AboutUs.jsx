import React from 'react';

export const AboutUs = () => {
  return (
    <div className="relative w-full">
      
      <div
        className="w-full h-[80vh] bg-fixed bg-center bg-contain md:bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/about1.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-noto">
              Reaping progress from our purpose
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-merriweather">
              At AGRI Machinery, we strive every day to put Farmers First. This unwavering commitment is guided by our purpose, vision and culture.
            </p>
          </div>
        </div>
      </div>

      
      <div className="bg-white  py-6 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-60">

          
          <div className="relative w-full md:w-[40%] flex flex-col items-start">
            <div className="absolute left-0 top-14 h-56 w-[4px] bg-green-600" />

            <div className="ml-5">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-libre">MISSION</h2>
              <p className="text-gray-700 text-lg leading-relaxed font-normal">
                Deliver innovative and sustainable <br />
                agricultural solutions to enhance <br />
                farm productivity and improve <br />
                the lives of farmers across the globe.
              </p>
            </div>
          </div>

          
          <span
            className="material-icons text-green-600 mt-32 ml-auto "  
            style={{ fontSize: '5rem' }} 
          >
            agriculture
          </span>

          
          <div className="relative w-full md:w-[45%] flex flex-col items-start">
            <div className="absolute left-0 top-14 h-56 w-[4px] bg-green-600" />

            <div className="ml-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-libre">VISION</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become a trusted global <br />
                leader in agricultural consultancy, <br />
                driving growth through advanced <br />
                machinery and expert guidance.
              </p>
            </div>
          </div>

          
          <span
            className="material-icons text-green-600 mt-32 ml-auto"  
            style={{ fontSize: '5rem' }} 
          >
            compost
          </span>
        </div>
      </div>

      <div
        className="w-full h-[80vh] bg-fixed bg-center bg-contain md:bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/about1.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-lg md:text-2xl max-w-5xl mx-auto font-merriweather">
            AGRI Machinery Mart is a leading agricultural consultancy dedicated to advancing modern farming. 
            We empower farmers with the latest in agri-machinery, tools, and expert guidance to help them achieve better yields and sustainable outcomes.
            </p>
          </div>
        </div>
      </div>
      
      
      <div className="bg-white text-gray-800 px-6 py-12 md:px-20">
        

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div>
            <h3 className="text-3xl font-semibold text-green-600 mb-2">Our Core Values</h3>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>Farmer-First Approach</li>
              <li>Innovation & Integrity</li>
              <li>Sustainable Growth</li>
              <li>Excellence in Service</li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-semibold text-green-600 mb-2">Why Choose Us</h3>
            <p className="text-gray-700 text-lg">
              Our experienced team provides end-to-end consulting, from equipment selection to service support. With deep agricultural insight and dedication, 
              we help our clients succeed season after season.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
