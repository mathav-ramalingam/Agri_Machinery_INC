import React from "react";

const ContactUs = () => {
  return (
    <div className="text-gray-800 font-sans">
      {/* Banner Header */}
      <div className="relative h-60 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576765607924-5e438a5cb59f')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold tracking-wide">Contact Us</h1>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 lg:px-20 py-16 bg-white">
        {/* Contact Form */}
        <form className="space-y-6 shadow-lg p-8 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Get In Touch 🌱</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name *" className="input" required />
            <input type="email" placeholder="Email *" className="input" required />
            <input type="tel" placeholder="Mobile *" className="input" required />
            <input type="text" placeholder="City *" className="input" />
            <input type="text" placeholder="State *" className="input" />
            <input type="text" placeholder="Country *" className="input" />
          </div>
          <textarea rows="4" placeholder="Your Comment" className="input w-full resize-none" />
          
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-sm">I’m not a robot</label>
            {/* reCAPTCHA widget goes here */}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition-all shadow-md">
              SEND MESSAGE
            </button>
            <button type="reset" className="border px-6 py-2 rounded-xl hover:bg-gray-100">Clear</button>
          </div>
        </form>

        {/* Company Info */}
        <div className="text-sm md:text-base space-y-4 p-8 shadow-lg border border-gray-200 rounded-2xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">AgriMach Mart Pvt Ltd 🚜</h2>
          <p><strong>Address:</strong> 77, Nungambakkam High Road, Chennai - 600034</p>
          <p><strong>Email:</strong> <a href="mailto:corporate@agrimart.com" className="text-green-700 underline">corporate@agrimart.com</a></p>
          <p><strong>Phone:</strong> +91 44 6691 9000</p>
          <p><strong>Fax:</strong> +91 44 2826 0224</p>
          <p><strong>Website:</strong> <a href="https://www.agrimart.com" className="text-green-700 underline">www.agrimart.com</a></p>
          <p><strong>Registered Office:</strong> 861 Anna Salai, Chennai - 600002</p>
        </div>
      </div>

      {/* Google Map */}
      <div className="h-96 w-full">
        <iframe
          title="AgriMach Mart Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8761014410485!2d80.23632911482288!3d13.04993451674025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267dc593346f1%3A0x3f17873c117e2595!2sTAFE!5e0!3m2!1sen!2sin!4v1615888663499!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

// Input styling
const inputStyles = `
  input.input, textarea.input {
    @apply w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400;
  }
`;

export default ContactUs;
