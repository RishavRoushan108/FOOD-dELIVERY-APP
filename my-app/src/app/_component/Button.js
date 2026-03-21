"use client";
const Button = ({ title, onClick, size = "md" }) => {
  const sizeClasses = {
    sm: "w-24",
    md: "w-36",
    lg: "w-56",
  };
  return (
    <button
      className={`bg-[#235736c3] text-white p-2 rounded-md hover:bg-[#2c6d44a9]
      ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
