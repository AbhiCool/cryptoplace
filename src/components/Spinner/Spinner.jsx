import React from "react";

const Spinner = ({ height = "min-h-[50vh]" }) => {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-[#4500c6]"></div>
    </div>
  );
};

export default Spinner;
