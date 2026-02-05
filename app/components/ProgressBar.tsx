
import React from "react";

const ProgressBar = ({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) => {
  const progressPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-sky-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
