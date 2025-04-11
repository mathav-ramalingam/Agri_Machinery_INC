import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
