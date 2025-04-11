import React from "react";

export const ServiceBooking = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white via-green-50 to-green-100 text-center px-4 relative overflow-hidden">
      {/* Floating sparkles */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 opacity-30 blur-2xl rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-300 opacity-20 blur-3xl rounded-full animate-ping"></div>

      {/* Animated Loader Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 border-8 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
      </div>

      {/* Heading and Message */}
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
        Service Booking
      </h1>
      <p className="text-gray-600 text-lg max-w-md">
        Oops! This feature is <span className="text-green-600 font-semibold">currently not available</span>. <br />
        But we're working on something amazing just for you 💚
      </p>

      {/* Back Button
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-5 py-3 rounded-full shadow-xl font-semibold tracking-wide transition-all duration-300 hover:scale-105 animate-pulse"
        >
          Back to Home
        </button>
      </div> */}
    </div>
  );
};
