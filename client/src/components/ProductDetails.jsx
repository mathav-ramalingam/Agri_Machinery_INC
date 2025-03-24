import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const location = useLocation();
  const [image, setimage] = useState(0);

  const data = location.state || "loading....";
  console.log(data);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div>
        <h1>Main container</h1>
        <img
          src={`http://localhost:3000/uploads/${data.Product_image[image]}`}
          alt=""
        />
      </div>
      <h1>{data.Product_Name}</h1>
      {data.Product_image.map((data, index) => (
        <li key={index}>
          {console.log(index)}
          <img
            src={`http://localhost:3000/uploads/${data}`}
            alt=""
            onClick={() => setimage(index)}
          />
        </li>
      ))}
    </div>
  );
};

export default ProductDetail;
