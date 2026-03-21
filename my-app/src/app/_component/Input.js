"use client";

const Input = ({ type, title, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-[#bfeed1] border-2 pl-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
